from django.shortcuts import render
import pandas as pd
import numpy as np
import os
from os import listdir
import annoy
from ast import literal_eval
from tqdm import tqdm
import time
from datetime import datetime, timedelta, date
from textwrap import dedent
import matplotlib.pyplot as plt
from statsmodels.tsa.api import VAR

def index(request):
    return render(request, "front.html")

def annoyvar(request):
    company = request.POST['company']
    imorre = request.POST['imorre']
    res = get_results(company, imorre)
    return render(request, "front.html", {"result": res})

def get_results(searched_stock='AAPL', side='response', num_stocks=10, requested_length=10):
    df = pd.read_csv('stock_prices_pctch.csv')
    df_rev = -df.iloc[:,1:len(df.columns)]
    df_rev.rename(columns=lambda x: x+'_reversed', inplace=True)
    df_comb = pd.concat([df, df_rev], axis=1)
    Stocks = df_comb.columns[1:len(df_comb.columns)].to_numpy()
    Vectors = np.array([df_comb.iloc[:,i].to_numpy() for i in range(1,len(df_comb.columns))])
    if searched_stock not in Stocks:
        res = {}
        for i in range(11):
            res[str(i)]=[0]*11
        return res
    class AnnoyIndex():
        def __init__(self, vectors, labels):
            self.dimension = len(vectors[0])
            self.vectors = vectors.astype('float32')
            self.labels = labels

        def build(self, number_of_trees=10):
            self.index = annoy.AnnoyIndex(self.dimension,'euclidean')
            for i, vec in enumerate(self.vectors):
                self.index.add_item(i, vec.tolist())
            self.index.build(number_of_trees)

        def query(self, stock, k=10):
            vector = self.vectors[int(np.where(self.labels==stock)[0])]
            indices = self.index.get_nns_by_vector(
                  vector.tolist(),
                  k,
                  search_k=-1,
                  include_distances=True)
            stocks = [(self.labels[i]) for i in indices[0]]

            return [(self.labels[indices[0][i]], indices[1][i]) for i in range(len(indices[0]))]

    index = AnnoyIndex(Vectors, Stocks)
    index.build()
    annoy_result = index.query(searched_stock, num_stocks)
    data = df # This is pd.read_csv('stock_prices_pctch.csv')
    data = data.drop('Date', axis=1)
    stocks = [annoy_result[i][0] for i in range(0, len(annoy_result))]
    selected_data = data.loc[:, stocks]

    def estimate_var(df, lags=1):
        model = VAR(df)
        fitted_model = model.fit(lags)
        return fitted_model

    def irfs(model, side, length=10):
        irf = model.irf(length) # length is desired number of periods for the IRF.
        irf_array = irf.irfs
        if side == 'response': # If the searched stock is the response stock
            requested_irfs = [irf_array[i][0] for i in range(0, length+1)] # Keep only irfs where the searched stock is the response variable.
        elif side == 'impulse': # If the searched stock is the impulse stock
            requested_irfs = []
            for i in range(0, length+1):
                requested_irfs.append([irf_array[i][j][0] for j in range(0, len(stocks))])
        else:
            print("Invalid argument 2; must be 'impulse' or 'response'.")
            requested_irfs = []
        irf_df = pd.DataFrame(requested_irfs, columns = stocks)
        return irf_df # df of irfs; columns are stocks; rows are periods.

    fitted_model = estimate_var(selected_data)
    irfs_df = irfs(fitted_model, side, requested_length)

    irfs_dict = {}
    for stock in stocks:
        irfs_dict[stock] = irfs_df.loc[:,stock].tolist()
    return irfs_dict

