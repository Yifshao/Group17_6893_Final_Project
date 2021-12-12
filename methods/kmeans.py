import numpy as np
import csv
import pandas
import ast
import random
from scipy import linalg
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt


def main():
	namelist = []
	datalist = []
	df = pandas.read_csv('nyse.csv')
	for i in range(len(df['Stock'])):
		namelist.append(df['Stock'][i])
	for i in range(len(df['Stock'])):
		namelist.append(df['Stock'][i] + " reversed")
	for i in range(len(df['Vector'])):
		datalist.append(ast.literal_eval(df['Vector'][i]))
	for i in range(len(df['Vector'])):
		datalist.append([datalist[i][j]*(-1) for j in range(len(datalist[i]))])
	tsnevalue = TSNE(n_components = 2).fit_transform(datalist)
	iteration = 50
	k = 100
	length = len(datalist[0])
	number = len(datalist)
	centers = []
	centersnum = np.zeros(k)
	for i in range(k):
		temp = []
		for j in range(length):
			temp.append(random.random()*((-1)**j)/100)
		centers.append(np.array(temp))
	for i in range(iteration):
		cluster = []
		distance = 10000
		for x in range(number):
			distance = 10000
			cluster.append(-1)
			l = len(cluster)
			for j in range(k):
				temp = linalg.norm(np.array(datalist[x]) - centers[j], 2)
				if temp < distance:
					distance = temp
					cluster[l-1] = j
		for y in range(len(cluster)):
			if centersnum[cluster[y]] == 0:
				centers[cluster[y]] = np.array(datalist[y])
				centersnum[cluster[y]] = 1
			else:
				centers[cluster[y]] = centers[cluster[y]]+np.array(datalist[y])
				centersnum[cluster[y]] += 1
		for z in range(len(centers)):
			if centersnum[z] != 0:
				centers[z] = centers[z] / centersnum[z]
		centersnum = np.zeros(k)
	output = []
	outvalue = []
	for i in range(k):
		temp = []
		temp2 = []
		for j in range(len(cluster)):
			if cluster[j] == i:
				temp.append(namelist[j])
				temp2.append(datalist[j])
		print(len(temp))
		output.append(temp)
		outvalue.append(temp2)
	print(output)
	plt.scatter(tsnevalue[:, 0],tsnevalue[:, 1], c = cluster, cmap = plt.cm.get_cmap("jet"))
	plt.show()







if __name__ == "__main__":
    main()