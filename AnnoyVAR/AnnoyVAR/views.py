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

def get_results(searched_stock='AAPL', side='response', num_stocks=10, requested_length=5):
    """
    Arguments:
    searched_stock: name of searched stock (string of uppercase letters)
    side: 'impulse' or 'response' (is the searched stock to be treated as the impulse or response?)
    num_stocks: number of related stocks to use in VAR model; default 10
    requested_length: duration of IRF (how many days into the future do you want to predict?); default 5
    """
    companylist = ['CSCO', 'SBGI', 'UFCS', 'GFED', 'AIRT', 'ISSC', 'KNDI', 'TRNS', 'AEIS', 'TROW', 'ISRG',
            'FEIM', 'LECO', 'VCYT', 'ORRF', 'BLDP', 'CHCO', 'SPOK', 'MGEE', 'AMSC', 'XLRN', 'SCYX', 'ASYS', 'HAFC', 'ADTN',
            'JVA', 'OFLX', 'DRRX', 'ASTC', 'HOV', 'NBIX', 'VRTX', 'GGAL', 'GILD', 'SLM', 'AMKR', 'CHY', 'TAYD', 'TATT',
            'WSTG', 'PFMT', 'EQIX', 'GURE', 'QUIK', 'PODD', 'IPAR', 'AMSWA', 'FORM', 'CPIX', 'V', 'QRVO', 'GEOS', 'IRMD',
            'CS', 'ATRS', 'HBP', 'HFBL', 'MCRI', 'SWKS', 'FRPT', 'ZGNX', 'TBPH', 'PPSI', 'IHD', 'LPTH', 'ENPH', 'MHLD',
            'OIIM', 'APEI', 'BPOP', 'EYES', 'ALCO', 'ICUI', 'MCHP', 'CDNS', 'NVMI', 'FUNC', 'UNB', 'ARDX', 'IVAC', 'MTEX',
            'ABCB', 'CHTR', 'HUBG', 'CORT', 'CASH', 'LNDC', 'TRMK', 'AGRX', 'BYFC', 'BNSO', 'CVGW', 'CHMG', 'EPZM', 'PEGA',
            'CCRN', 'CXDC', 'FLXN', 'WBA', 'DAIO', 'SUPN', 'CSTE', 'ESGR', 'AMRS', 'TSRI', 'DGII', 'VNET', 'VICR', 'OIS',
            'DISH', 'RGEN', 'ACFN', 'NWFL', 'DOX', 'CLMT', 'SMMF', 'ASMB', 'UEPS', 'MEIP', 'CBOE', 'LOAN', 'VRNT', 'ACIW',
            'EVOK', 'RWLK', 'NICE', 'CBAY', 'WB', 'CBAN', 'LJPC', 'GENC', 'CG', 'CYAN', 'WASH', 'ULBI', 'ASUR', 'HAIN',
            'HSTM', 'STXS', 'SABR', 'CSQ', 'BOTJ', 'ZEUS', 'CDTI', 'VALU', 'BLDR', 'KRNY', 'NATR', 'WIRE', 'FGEN', 'RDCM',
            'APDN', 'ZIOP', 'NTCT', 'ENSG', 'HBMD', 'VTNR', 'EDI', 'CASI', 'ALLT', 'FRGI', 'PPC', 'PSO', 'SRCL', 'PPG',
            'GOLD', 'AUBN', 'LINC', 'TENX', 'RDUS', 'FUND', 'SILC', 'ICCC', 'HNNA', 'MSTR', 'CHCI', 'BKCC', 'MDWD', 'SKYW',
            'GTLS', 'PLCE', 'CNMD', 'REFR', 'CIDM', 'ATSG', 'ASTE', 'ATRC', 'UEIC', 'XNET', 'VLGEA', 'ADI', 'TZOO', 'ADBE',
            'CYTK', 'HMHC', 'OTEX', 'RIGL', 'BANX', 'RYAAY', 'SAL', 'CDK', 'REPH', 'STLD', 'PSTI', 'NURO', 'LCUT', 'TTMI',
            'SAVE', 'SMCI', 'RHDGF', 'CPRT', 'SCOR', 'BSQR', 'LQDT', 'TCCO', 'CHI', 'TCBK', 'QNST', 'GILT', 'GLPI', 'MGI',
            'FSBW', 'CYCC', 'NEON', 'OSUR', 'HCSG', 'ACRX', 'AXGN', 'FDUS', 'WTFC', 'RBCN', 'GBDC', 'AMPH', 'ODP', 'UBCP',
            'TGLS', 'NSIT', 'AERI', 'MOFG', 'RARE', 'DAKT', 'ONCY', 'ANAT', 'EFLVF', 'XONE', 'GCBC', 'PRQR', 'FBMS', 'MASI',
            'EGAN', 'ALNY', 'FISI', 'BIOC', 'COST', 'WWD', 'VSEC', 'BLRX', 'GABC', 'PNNT', 'SYPR', 'SPWH', 'CASY', 'AEHR',
            'VOXX', 'MDLZ', 'ZIXI', 'IEP', 'SBSI', 'CTRE', 'UVSP', 'ZBRA', 'PLAY', 'SGOC', 'PDCO', 'LTBR', 'AEY', 'CYBR',
            'MGIC', 'CUTR', 'CYBE', 'QURE', 'MPB', 'CERN', 'VNDA', 'MET', 'BJRI', 'STAA', 'ACGL', 'TCBI', 'ACHC', 'YY',
            'HCKT', 'LAMR', 'VRNS', 'JBLU', 'EVOL', 'RUTH', 'PTSI', 'HTHT', 'PFLT', 'CPSS', 'ATHX', 'FAST', 'MLAB', 'OMEX',
            'FFWM', 'SMLR', 'VECO', 'WHLR', 'FOSL', 'FCEL', 'JCS', 'SHEN', 'SANW', 'GENE', 'ATRA', 'CWCO', 'GRBK', 'LMNR',
            'STX', 'SMTC', 'BSET', 'YORW', 'PLBC', 'IMMR', 'NSEC', 'USAP', 'PREC', 'BECN', 'SLRC', 'ARKR', 'RAIL', 'CDNA',
            'PWOD', 'WERN', 'ROIC', 'DORM', 'TITN', 'NVAX', 'TLOG', 'CSGS', 'PINC', 'SEED', 'MCOA', 'DCOM', 'ORMP', 'CHKP',
            'EBAY', 'SBUX', 'PENN', 'GTIM', 'MMYT', 'LPSN', 'INTU', 'GRFS', 'MNKD', 'HA', 'UBFO', 'PTNR', 'GLAD', 'ADES',
            'STFC', 'HMNF', 'CYRN', 'IPGP', 'PXLW', 'CLFD', 'IBTX', 'SFM', 'CROX', 'ECPG', 'LTRX', 'DENN', 'CAC', 'UPLD',
            'GLYC', 'NERV', 'ODFL', 'FMNB', 'AHPI', 'PAAS', 'RGCO', 'MNST', 'WVVI', 'CEVA', 'AMZN', 'LFVN', 'IRIX', 'ASRV',
            'PCOM', 'ESLT', 'INTC', 'SAFM', 'IBCP', 'SFBC', 'KOPN', 'PDFS', 'PTCT', 'LUNA', 'LKFN', 'UTMD', 'BKEP', 'VSTM',
            'IOSP', 'AIMC', 'TGEN', 'CFFN', 'HIMX', 'ITI', 'AWRE', 'RVNC', 'TRIB', 'SUMR', 'ARLP', 'RFIL', 'EMF', 'CHRS',
            'HLIT', 'CZNC', 'CSGP', 'LWAY', 'NVEC', 'SPPI', 'GAIA', 'IDCC', 'ENTA', 'ICFI', 'CONN', 'WLDN', 'BRID', 'DXCM',
            'RMCF', 'DSPG', 'HIBB', 'BRKL', 'HRTX', 'GLMD', 'LOPE', 'CLRB', 'HOLX', 'EXPD', 'SSYS', 'XNCR', 'TXN', 'VRSK',
            'FFA', 'GBLX', 'WABC', 'TOPS', 'NKSH', 'CLDX', 'CEMI', 'DRNA', 'ATLC', 'NNBR', 'QUMU', 'DWSN', 'KVHI', 'MELI',
            'FTNT', 'NUVA', 'MOG-A', 'OMAB', 'AMCX', 'VBLT', 'GERN', 'TORM', 'AXTI', 'FFIN', 'STRS', 'CBSH', 'SAIA', 'JBSS',
            'ADSK', 'QLYS', 'SFNC', 'CBRL', 'ONB', 'LORL', 'DIOD', 'URBN', 'LSCC', 'VOD', 'EXPE', 'MPAA', 'PCAR', 'ESBK',
            'NTIC', 'WDC', 'MDRX', 'RCMT', 'NDLS', 'LLNW', 'FNHC', 'AEZS', 'PEBO', 'JACK', 'HELE', 'KEQU', 'CATY', 'HBIO',
            'BIDU', 'ALKS', 'NVFY', 'VCEL', 'SRDX', 'PLPC', 'DSGX', 'BGFV', 'MSFT', 'MSEX', 'CTAS', 'ALGT', 'SBLK', 'PRTK',
            'ALDX', 'EGHT', 'CSII', 'DXLG', 'CVCY', 'CACC', 'NTES', 'DVAX', 'PEBK', 'CFFI', 'JOBS', 'WLFC', 'CHDN', 'QCRH',
            'WRLD', 'RYI', 'PROV', 'AUPH', 'SFBS', 'OTTR', 'GPRE', 'OCUL', 'CPLP', 'PFSW', 'OXBR', 'IBOC', 'VRSN', 'PCYG',
            'IMIAY', 'LOGI', 'RIBT', 'LAKE', 'AMAT', 'PANL', 'CWST', 'PFIN', 'CAR', 'GRPN', 'TAST', 'UBSI', 'ACNB', 'TNP',
            'MRCY', 'BMRN', 'LMRK', 'NYMT', 'FSD', 'STRA', 'LFUS', 'ATVI', 'FEI', 'MGLN', 'EA', 'SOHO', 'KOSS', 'EMKR', 'PSEC',
            'AMD', 'RCON', 'SIEN', 'ERII', 'RDHL', 'RAVN', 'ENZN', 'CVCO', 'COLB', 'ANIK', 'LYTS', 'KBAL', 'NXPI', 'TBNK',
            'NAII', 'FELE', 'SLAB', 'CMCO', 'CTBI', 'BIIB', 'NVDA', 'RMTI', 'CHRW', 'TREE', 'FRBA', 'MMLP', 'MCBC', 'IDXX',
            'HEAR', 'CFRX', 'CCNE', 'YNDX', 'LGIH', 'SPSC', 'ZUMZ', 'FBIZ', 'BBBY', 'ENTG', 'BLMN', 'ROYL', 'RMBS', 'UFPT',
            'SYBT', 'TWOU', 'HOLI', 'WSFS', 'HES', 'INTG', 'SHOO', 'TYL', 'CRUS', 'GBLI', 'EZPW', 'ESXB', 'TTEC', 'DLHC',
            'IPDN', 'FCCY', 'RGLD', 'INCY', 'HSIC', 'LBRDA', 'AAWW', 'CENT', 'FATE', 'RGLS', 'ATNM', 'CRMT', 'ACOR', 'OMCL',
            'INBK', 'NBTB', 'SSBI', 'FCAP', 'CECE', 'LTRPA', 'QBAK', 'FCCO', 'CME', 'TCFC', 'JRVR', 'MNDO', 'SHBI', 'MYGN',
            'MRVL', 'FFHL', 'RBCAA', 'AVAV', 'NUAN', 'FONR', 'OCC', 'IRDM', 'VLY', 'CTG', 'CSPI', 'HWKN', 'HURN', 'CVLT',
            'CMCSA', 'TESS', 'EGRX', 'MANT', 'CTXS', 'CCXI', 'SYNA', 'WHF', 'DVCR', 'SEIC', 'TRIP', 'PETS', 'MTLS', 'OPTT',
            'ICPT', 'UHS', 'SBCF', 'TBBK', 'CCBG', 'FIVE', 'ROLL', 'FLIC', 'DMLP', 'SBAC', 'SIRI', 'PTC', 'FWRD', 'PRTS',
            'PYS', 'CSIQ', 'MATW', 'PNFP', 'GOGO', 'UCTT', 'HRZN', 'SYNL', 'CAAS', 'JJSF', 'CZWI', 'WIX', 'CAMP', 'PKBK',
            'HURC', 'CVLY', 'INO', 'INVT', 'SMSI', 'RNST', 'HMTV', 'OVLY', 'FANG', 'AELTF', 'TAIT', 'CRVS', 'KMDA', 'TCPC',
            'CNET', 'MNRO', 'VTR', 'ACLS', 'BCRX', 'FMBI', 'SMED', 'SCHL', 'CENX', 'MRLN', 'MBII', 'PCTY', 'TCX', 'HTLD',
            'SASR', 'STKL', 'ATOS', 'QRHC', 'AMBA', 'CRNT', 'TBK', 'EFOI', 'HTBX', 'MAR', 'ATAX', 'AMNB', 'HMNY', 'CHSCP',
            'FB', 'PSIX', 'VBTX', 'CLRI', 'EXPO', 'KE', 'GNTX', 'ANGO', 'GASS', 'SIGI', 'SGEN', 'COLM', 'NEO', 'CONE',
            'LKQ', 'SGRP', 'BELFB', 'AUDC', 'BLUE', 'SREV', 'JOUT', 'MTBC', 'WEYS', 'ARCC', 'AROW', 'NSTG', 'IAC', 'ISBC',
            'KIRK', 'DHIL', 'SNCR', 'LULU', 'CHEF', 'BRKR', 'SOHU', 'CVV', 'GBCI', 'MIND', 'AAOI', 'NRIM', 'OMF', 'LARK',
            'CRTO', 'JSD', 'MICT', 'AVNW', 'STRL', 'MRCC', 'CBFV', 'TXRH', 'BMRC', 'AMBC', 'HQY', 'IMKTA', 'RICK', 'SGC',
            'EXEL', 'MRNS', 'MMS', 'HTLF', 'FOXF', 'SCHN', 'OSIS', 'MPWR', 'NEPT', 'UNFI', 'CNSL', 'NWBO', 'MITK', 'FSFG',
            'NYMX', 'CGNX', 'STRM', 'DGLY', 'HDSN', 'POWL', 'CLSN', 'FIF', 'OXLC', 'CYIO', 'AMTX', 'ERIE', 'BRKS', 'PBHC',
            'SRPT', 'SIEB', 'CALA', 'SIFY', 'PBIP', 'ITIC', 'PCH', 'OPOF', 'WEN', 'MACK', 'ANIP', 'NMIH', 'MOMO', 'LBAI',
            'RAND', 'ALGN', 'NFLX', 'ITRI', 'CMCT', 'TNXP', 'CCMP', 'SBNY', 'ARCB', 'WINA', 'ELTK', 'FITB', 'EML', 'TEDU',
            'PPBI', 'FRBK', 'ARAY', 'FIVN', 'ARNA', 'FIZZ', 'CCLP', 'UFS', 'WETF', 'NTRS', 'TRIL', 'GSBC', 'AINV', 'USEG',
            'NTGR', 'EEFT', 'MANH', 'UFPI', 'APOG', 'PRMW', 'FIBK', 'IMGN', 'INVE', 'SAFT', 'OVBC', 'EDAP', 'PATK', 'MRTX',
            'FFIC', 'RELL', 'OFIX', 'HALL', 'PACB', 'TSCO', 'TSBK', 'MEOH', 'HSKA', 'ATLO', 'GNCA', 'JBHT', 'HSII', 'PZZA',
            'EDUC', 'PCYO', 'HTBI', 'MAT', 'ARTNA', 'ACAD', 'CLIR', 'MGNX', 'ECHO', 'AAME', 'AXAS', 'WATT', 'MRTN', 'WTBA',
            'LSBK', 'POWI', 'CLRO', 'SSB', 'ANDE', 'TRST', 'EBMT', 'ANGI', 'IART', 'UMBF', 'UCBI', 'SENEB', 'AKBA', 'ABIO',
            'FRME', 'DXYN', 'DISCA', 'AKAM', 'VSAT', 'NSYS', 'EWBC', 'AGYS', 'OLED', 'PRTA', 'ROCK', 'EBTC', 'ITRN', 'AGTC',
            'PBPB', 'SUNS', 'GAIN', 'PMD', 'COMM', 'LEDS', 'PNRG', 'RAVE', 'FCNCA', 'ONEQ', 'EHTH', 'PAYX', 'ESCA', 'BOSC',
            'AMX', 'GLNG', 'AMWD', 'LXRX', 'ILMN', 'GLBS', 'ACTG', 'ASPS', 'HALO', 'SCSC', 'GPRO', 'SOFO', 'CYH', 'AAL',
            'MYRG', 'INOD', 'XLNX', 'SP', 'FCBC', 'HAYN', 'HTBK', 'CCF', 'MMU', 'PFIS', 'LSTR', 'BCPC', 'SSNC', 'PFIE',
            'GIFI', 'GIGM', 'TTEK', 'PACW', 'CRAI', 'NWBI', 'SMIT', 'TTGT', 'AMOT', 'MGYR', 'POOL', 'AAON', 'CZR', 'PATI',
            'GT', 'CRWS', 'FFIV', 'SAGE', 'CINF', 'VNOM', 'JD', 'FOLD', 'MKTX', 'BLCM', 'CAMT', 'PRAA', 'CMTL', 'PME',
            'CCOI', 'ORLY', 'APTO', 'FLDM', 'SPRO', 'APWC', 'HNRG', 'PLPL', 'SNPS', 'PLUG', 'EPAM', 'SIVB', 'DXPE', 'BUSE',
            'NDSN', 'MCHX', 'HBNC', 'UTSI', 'FULT', 'NSSC', 'CTIC', 'CDZI', 'TILE', 'FNLC', 'PLAB', 'AGIO', 'OPHC', 'SBRA',
            'PRIM', 'PRKR', 'FLXS', 'MVIS', 'RVSB', 'EBIX', 'USLM', 'CSWC', 'KPTI', 'ZNGA', 'WSBC', 'TRS', 'DYNT', 'ADXS',
            'REGN', 'TACT', 'IRBT', 'EXTR', 'AMRN', 'THFF', 'SANM', 'AVID', 'CPHC', 'MBWM', 'STBA', 'FORR', 'CLNE', 'BMTC',
            'NKTR', 'OTIC', 'TTOO', 'KELYA', 'CPSI', 'EXAS', 'SMBC', 'FSLR', 'LAND', 'AMGN', 'GEVO', 'CRIS', 'ADMS', 'UNAM',
            'CYTR', 'CREG', 'VIVO', 'FORD', 'JKHY', 'OSBC', 'FAM', 'ADP', 'GROW', 'FMY', 'NECB', 'RRGB', 'CNOB', 'ON',
            'DGICA', 'CAKE', 'III', 'SWIR', 'BITRF', 'USAK', 'DMRC', 'PRFT', 'CTIB', 'BBSI', 'SPWR', 'SRNE', 'XTLB',
            'SLGN', 'KINS', 'UMPQ', 'GPS', 'BWFG', 'HBCP', 'GOOD', 'SBFG', 'EPAY', 'PLUS', 'PERI', 'EBSB', 'QCOM', 'TGTX',
            'MDXG', 'MMSI', 'CVGI', 'SPCB', 'ROST', 'BLKB', 'JAKK', 'ISIG', 'TWIN', 'LBTYA', 'MTRX', 'SGMS', 'FRPH', 'UNTY',
            'TSC', 'RNWK', 'ASTI', 'ATRO', 'ECOL', 'AXDX', 'LAWS', 'OKE', 'BCOR', 'BCLI', 'MIDD', 'KTOS', 'AFMD', 'KFFB',
            'SLP', 'MNTX', 'ESPR', 'INFN', 'AMED', 'PCRX', 'XENT', 'PAHC', 'SFST', 'CPRX', 'BSRR', 'WSTL', 'LOCO', 'ADMP',
            'HSON', 'OCFC', 'FFNW', 'IBKR', 'UBOH', 'VRTS', 'FFBC', 'SIBE', 'SPNS', 'TRUE', 'NCLH', 'RDNT', 'CTSO', 'BLFS',
            'GSIT', 'COHR', 'ZION', 'AGEN', 'PRGS', 'EGLE', 'NCTY', 'ENDP', 'CTHR', 'DJCO', 'MARA', 'IDRA', 'HBAN', 'EGBN',
            'MORN', 'ONTX', 'BGCP', 'MOSY', 'HEES', 'FISV', 'SRCE', 'SPTN', 'RDWR', 'RDI', 'NTWK', 'CASS', 'RRD', 'RUSHA',
            'CMPR', 'KLIC', 'XOMA', 'PBCT', 'CFBK', 'DSWL', 'UTHR', 'IIN', 'SGMA', 'NATH', 'PDCE', 'LE', 'ESEA', 'MA',
            'BCBP', 'FSTR', 'DBVT', 'HOFT', 'EFSC', 'NWSA', 'GLDD', 'FORTY', 'PSMT', 'SAMG', 'CERS', 'ACST', 'MBCN', 'ATEC',
            'PFBC', 'UIHC', 'GWGH', 'WAFD', 'FWP', 'LANC', 'JRJC', 'KALU', 'MGRC', 'IRWD', 'VBIV', 'BANF', 'AAPL', 'CGO',
            'INGN', 'OMER', 'BDSI', 'FARM', 'INDB', 'SATS', 'CNTY', 'CHW', 'TSEM', 'EXLS', 'VRA', 'TOWN', 'FTEK', 'KFRC',
            'GBIM', 'ADUS', 'FCT', 'FBP', 'GRMN', 'MBUU', 'BCOV', 'NEOG', 'MNOV', 'SHIP', 'MARPS', 'FLL', 'CGEN', 'KTCC',
            'DLTR', 'REGI', 'CLVS', 'HAS', 'ICLD', 'SNFCA', 'NATI', 'NCMI', 'CTRN', 'HIFS', 'SIMO', 'PHI', 'NTAP', 'BLIN',
            'HIHO', 'NBN', 'RGS', 'BNFT', 'CARV', 'GALT', 'PRPH', 'LGND', 'PNBK', 'CARA', 'ABMD', 'LPLA', 'CSBR', 'LPCN',
            'RADA', 'QDEL', 'WYNN', 'LILA', 'CHUY', 'SEAC', 'HGSH', 'COHU', 'CDXS', 'RCKY', 'TNDM', 'SPLK', 'CTSH', 'TRVN',
            'HMST', 'OFS', 'JYNT', 'AZPN', 'WSBF', 'MU', 'MKSI', 'SCVL', 'IPWR', 'CNCE', 'CUBA', 'WHLM', 'NICK', 'BANR',
            'FARO', 'XENE', 'SVVC', 'NEWT', 'RESN', 'CDW', 'TEI', 'INFI', 'ASML', 'TGA', 'ADMA', 'HFWA', 'MGPI', 'AOSL',
            'NLST', 'TOUR', 'Z', 'MERC', 'JTD', 'NWPX', 'OSTK', 'LMAT', 'CLWT', 'IMOS', 'HWBK', 'CMRX', 'BBGI', 'CHNR',
            'LRCX', 'BCS', 'PLXS', 'QTNT', 'EDF', 'SPXX', 'NVCN', 'OBCI', 'BWEN', 'NXN', 'BNY', 'EFT', 'NTZ', 'UAL', 'EGP',
            'WOR', 'PRGO', 'PLOW', 'PHG', 'PDS', 'BXC', 'KSM', 'CHCO', 'SPLP', 'TSI', 'DVN', 'MN', 'CEQP', 'MQT', 'HOV',
            'AFG', 'VPG', 'MDU', 'CFR', 'DCO', 'CGA', 'HVT', 'JOB', 'ARC', 'HSBC', 'BOOT', 'MDC', 'V', 'SXI', 'CS', 'FLC',
            'NC', 'FLT', 'MO', 'GEL', 'IHD', 'MHLD', 'UBA', 'NOAH', 'BBL', 'EHI', 'WWW', 'AGRO', 'GS-PJ', 'GIM', 'IGI',
            'BZH', 'PFO', 'LVS', 'QTWO', 'CRT', 'TRN', 'CPK', 'DTE', 'FCN', 'VGM', 'GWRE', 'T', 'OIS', 'CF', 'STAG', 'CII',
            'VSH', 'VG', 'MGM', 'SBR', 'JLL', 'HTH', 'CFG', 'SAH', 'SBS', 'DAR', 'TY', 'DLB', 'DLNG', 'ATEN', 'SNP', 'MSI',
            'HNP', 'NPTN', 'CP', 'FMS', 'LH', 'PEB', 'PFN', 'WAL', 'WNC', 'BTU', 'NBB', 'WLK', 'PKI', 'LNC', 'EDI', 'PSX',
            'BOH', 'AKO-A', 'PPT', 'RHP', 'KFY', 'GPN', 'PPG', 'WWE', 'PRO', 'BLW', 'WTI', 'IRM', 'BCX', 'BAP', 'EFR', 'ESS',
            'WMK', 'GJS', 'KRO', 'NOV', 'GDO', 'WBS', 'NOA', 'IHC', 'HAL', 'TPC', 'STM', 'NS', 'CSU', 'LL', 'SUI', 'MPV',
            'MSM', 'BG', 'MPA', 'AEM', 'OIA', 'DMB', 'MFL', 'CHH', 'THR', 'VPV', 'SCD', 'TDF', 'DCI', 'SAM', 'DBL', 'MHF',
            'CEN', 'MRIN', 'TDG', 'XPO', 'THS', 'JW-A', 'ARR', 'CIM', 'ASA', 'MFM', 'ARE', 'JBT', 'G', 'VGI', 'HMY', 'AGD',
            'GTN-A', 'HMN', 'MPW', 'OEC', 'GNRC', 'STL', 'NR', 'PDT', 'IIF', 'PEG', 'RFI', 'LLY', 'TPVG', 'UMH', 'GPK',
            'BME', 'KEP', 'CORR', 'PNNT', 'GPI', 'REG', 'LOW', 'NBR', 'NCV', 'WLL', 'NCA', 'WNS', 'WCC', 'PGZ', 'C-PK',
            'NLY', 'CSV', 'AKR', 'NP', 'R', 'AFB', 'VET', 'ASC', 'HYI', 'THQ', 'DLR', 'ACGL', 'CIO', 'TGI', 'INGR', 'JOF',
            'MHD', 'CEM', 'TDS', 'TGH', 'SAN', 'ORI', 'SOR', 'UL', 'BXMT', 'CUBI', 'SNV', 'WD', 'ASB', 'THG', 'JCS', 'AEO',
            'MPC', 'AFT', 'ZDPY', 'XIN', 'TRI', 'VIV', 'CRS', 'AHH', 'TSM', 'NOC', 'BXP', 'PGRE', 'CODI', 'UTI', 'GHY',
            'IPG', 'BURL', 'ALLE', 'GUT', 'BDN', 'BGB', 'NID', 'IR', 'AMT', 'CTT', 'DPZ', 'AMC', 'PAYC', 'ACH', 'CYD',
            'TMHC', 'CLR', 'OXM', 'MCR', 'PG', 'TSLX', 'DPSGY', 'JHS', 'SFL', 'KODK', 'CCK', 'RY', 'SHG', 'VVR', 'MUI',
            'FFC', 'JPC', 'ABM', 'MYJ', 'VMO', 'NIE', 'EXP', 'WES', 'NFJ', 'GLW', 'USPH', 'BDX', 'BGT', 'RFIL', 'EMF',
            'RNP', 'HIVE', 'UHT', 'RNR', 'PWR', 'TREC', 'NRZ', 'PYN', 'EVN', 'RVT', 'EPR-PE', 'KYN', 'LPG', 'EXR', 'KWR',
            'TTM', 'DSU', 'RLGY', 'MUSA', 'AAT', 'MTX', 'EARN', 'FFA', 'JRI', 'REXR', 'TLK', 'JDD', 'MITT', 'DKS', 'FPL',
            'TMO', 'OXY', 'RL', 'MAN', 'DECK', 'JGH', 'TNC', 'CCI', 'DEX', 'MLI', 'MOD', 'JNPR', 'CMC', 'CNX', 'DHI',
            'CNO', 'AVK', 'RM', 'VTN', 'MTN', 'ED', 'HIW', 'MUJ', 'DIAX', 'SPB', 'FIX', 'MYI', 'IP', 'NIQ', 'RMAX', 'PAI',
            'PBR', 'WGO', 'IBP', 'PNF', 'NEE', 'UPS', 'PZC', 'ALEX', 'EME', 'LEG', 'BKT', 'EMR', 'LDP', 'JAZZ', 'BHK',
            'ARCO', 'NSL', 'KOF', 'NEV', 'PBA', 'VCRA', 'RYI', 'PAM', 'HEP', 'AME', 'CTR', 'HP', 'DD', 'ASPN', 'VNCE',
            'EW', 'FL', 'FRA', 'SID', 'CMG', 'AWK', 'SM', 'CMP', 'HPF', 'MLM', 'MOV', 'HPP', 'ZNH', 'MMI', 'MNR', 'TNP',
            'SKM', 'FSS', 'SJI', 'AVY', 'FSD', 'CLB', 'HIE', 'CXP', 'MUX', 'FEI', 'VBF', 'DE', 'MVT', 'FHN', 'VMI', 'HDB',
            'SPG', 'HEQ', 'PSEC', 'RWT', 'URI', 'USM', 'PMO', 'WIA', 'PMX', 'PNC', 'KMX', 'EAT', 'BGR', 'ELS', 'LEU', 'WPC',
            'BKD', 'PVG', 'CRD-B', 'IVR', 'RCS', 'NXRT', 'NEU', 'WHG', 'WIT', 'POR', 'DOOR', 'ICD', 'PMM', 'PCF', 'EXC',
            'INT', 'GBX', 'PCQ', 'SPE', 'MYN', 'SPR', 'JRO', 'CXE', 'OMI', 'DG', 'JQC', 'HIG', 'SKX', 'JEQ', 'PB', 'SIG',
            'CMS', 'CLW', 'AWH', 'MNP', 'AXP', 'DEI', 'DFS', 'AZN', 'HPS', 'HRL', 'CAF', 'FRT', 'CNI', 'MCA', 'CIVI', 'VCV',
            'FGB', 'HR', 'AMP', 'BDCZ', 'VLY', 'HE', 'CNHI', 'AMG', 'PBT', 'CMCSA', 'GAB', 'PNW', 'ICE', 'BST', 'IBA', 'NDP',
            'BDJ', 'BEN', 'KOS', 'RBA', 'UHS', 'ELP', 'PTY', 'LGI', 'EMN', 'ROK', 'GWB', 'WRE', 'PYS', 'NSC', 'NRP', 'NPO',
            'GNW', 'HRZN', 'PRLB', 'NIM', 'NHI', 'FIS', 'SQM', 'TTP', 'VLT', 'ANF', 'OCN', 'DK', 'MUA', 'ESNT', 'ABR', 'FT',
            'MTR', 'SU', 'VEEV', 'SKT', 'CNS', 'LADR', 'BHLB', 'FPF', 'RF', 'MMP', 'HQL', 'SFE', 'TAP', 'CCU', 'SC', 'DHT',
            'TOL', 'AWR', 'ST', 'ATI', 'FRO', 'GF', 'CXH', 'SSD', 'SPH', 'MYC', 'INN', 'GMED', 'SIGI', 'IBM', 'BSX', 'EVR',
            'BPT', 'FBHS', 'ITW', 'RCI', 'EOG', 'BHE', 'EMO', 'LFC', 'BHP', 'ORAN', 'LEO', 'ARCC', 'GNT', 'ETX', 'NEM',
            'WFC', 'PAA', 'IO', 'MXE', 'DPG', 'CUZ', 'TMST', 'JSD', 'GD', 'CNP', 'AXTA', 'PM', 'RE', 'CAH', 'PANW', 'MMD',
            'CBD', 'DGX', 'CAI', 'SGU', 'AWF', 'AVB', 'SJR', 'MCY', 'RS', 'CNQ', 'TNK', 'QSR', 'GE', 'ACC', 'JPI', 'HII',
            'SSTK', 'ABG', 'MUC', 'LDOS', 'MTG', 'OAS', 'FIF', 'SRC', 'ALL', 'TWI', 'AMH', 'HRTG', 'GAM', 'EVF', 'IBN',
            'GOF', 'NGS', 'BSL', 'PMT', 'ENVA', 'ETN', 'BFZ', 'KNX', 'EOD', 'WST', 'GWW', 'EOS', 'BIF', 'PTR', 'BKN', 'LII',
            'BBVA', 'PZN', 'AINV', 'MS-PF', 'GCV', 'NMFC', 'PBH', 'KB', 'AOD', 'BSAC', 'MYD', 'OLP', 'ABC', 'JPM', 'ABT',
            'FR', 'PFSI', 'OMC', 'ACP', 'COF', 'SHI', 'ASGN', 'MLR', 'HST', 'AXL', 'CCS', 'DDF', 'MOH', 'ATO', 'COP', 'FSM',
            'SE', 'BFAM', 'FDS', 'VAC', 'TYG', 'HIL', 'MYE', 'HFC', 'CVE', 'DSX', 'PBI', 'PAR', 'EVT', 'APAM', 'EVC', 'ALSN',
            'PMF', 'KMF', 'NSS', 'BIP', 'GVA', 'KAR', 'WRB', 'SLCA', 'EBS', 'BWMG', 'GAIN', 'BRFS', 'GNE', 'BRX', 'NFG',
            'BRO', 'PAG', 'ANET', 'KTF', 'CWT', 'ALK', 'DRI', 'DSM', 'CUK', 'DY', 'FF', 'CYH', 'MAV', 'LEN-B', 'COR', 'MMU',
            'TAC', 'HQH', 'SEM', 'CBU', 'DDS', 'NYCB', 'MMC', 'MLP', 'JHI', 'MMT', 'SJT', 'CLH', 'AVD', 'DHF', 'SIX', 'SF',
            'FDP', 'MUE', 'HIO', 'DSL', 'GLOB', 'TUP', 'HL', 'TWO', 'DRH', 'VMC', 'SRE', 'PCN', 'LPI', 'NJR', 'ICL', 'YPF',
            'BFK', 'BEP', 'RCL', 'NPK', 'PXD', 'BGX', 'NRT', 'WSR', 'ELY', 'EPAM', 'BLX', 'RGT', 'BAH', 'RFP', 'YUM', 'NCZ',
            'WMS', 'GHC', 'IGT', 'LYV', 'WBK', 'PDM', 'PEI', 'AIV', 'SWN', 'TPL', 'MG', 'FMX', 'LC', 'BH', 'MSB', 'MFC',
            'TR', 'VZ', 'ASX', 'MHI', 'CEA', 'CDR', 'TGS', 'BXMX', 'MGF', 'NBHC', 'CM', 'MPX', 'AR', 'FMY', 'TPZ', 'STC',
            'SUP', 'FMN', 'CSL', 'STT', 'PFD', 'GGZ', 'GER', 'PFS', 'WCN', 'GDV', 'RRC', 'PHX', 'RSG', 'IFF', 'NUV', 'RDY',
            'EGO', 'KFS', 'LAD', 'IPI', 'BCC', 'NVO', 'NTP', 'GIS', 'PII', 'EPD', 'KRC', 'BYM', 'LUV', 'TPX', 'DVD', 'SWZ',
            'AGI', 'CO', 'HMC', 'BK', 'MSA', 'FBC', 'SYF', 'OHI', 'AG', 'NGVC', 'CHS', 'CHD', 'HTA', 'STOR', 'MHK', 'MIN',
            'TEO', 'SCI', 'DAL', 'MIY', 'HASI', 'TGP', 'SLF', 'MFV', 'CHE', 'ARI', 'DMO', 'MFA', 'FCF', 'SXC', 'XHR', 'K',
            'SXT', 'VGR', 'ADS', 'HLF', 'FOR', 'TRQ', 'CRK', 'AIT', 'OFC', 'CPT', 'VKQ', 'MTRN', 'NMS', 'PFG', 'CSTM',
            'LXP', 'UTF', 'BWG', 'ESI', 'EPR', 'ZION', 'IGA', 'RGA', 'TRNO', 'ISD', 'NXR', 'PSF', 'RJF', 'EIG', 'GRX',
            'SEAS', 'UNH', 'GSK', 'PRU', 'PBYI', 'WTS', 'PSB', 'GPC', 'ALLY', 'EDD', 'IRS', 'NWN', 'VOYA', 'RGR', 'IGR',
            'NAT', 'WMB', 'BTO', 'KSU', 'CPG', 'POST', 'AIG', 'MA', 'TSQ', 'AHT', 'NM', 'HON', 'AB', 'BRK-A', 'X', 'WHZT',
            'AU', 'MSD', 'MEI', 'SLB', 'HYT', 'DNP', 'SON', 'CIR', 'MGA', 'MHN', 'SAR', 'MKC', 'ORC', 'TDY', 'HYB', 'FUN',
            'SMP', 'APD', 'SMG', 'SCCO', 'AER', 'FCT', 'FBP', 'AGM', 'HLT', 'OII', 'NL', 'AIF', 'TRC', 'CPF', 'KRG', 'MAIN',
            'TEVA', 'RPM', 'RQI', 'PIM', 'EQS', 'LXU', 'WMC', 'MHNC', 'IQI', 'LMT', 'EEA', 'UNM', 'KEYS', 'UMC', 'GSL',
            'RHI', 'KIO', 'BAM', 'PKG', 'IIM', 'WAB', 'LTC', 'TSE', 'FNF', 'SWK', 'CRL', 'TRV', 'ADC', 'AEP', 'AGO', 'CIF',
            'MGU', 'TKC', 'FUL', 'THO', 'CEE', 'JMP', 'RYAM', 'STNG', 'SAP', 'TEI', 'JNJ', 'TV', 'WM', 'CHT', 'MFG', 'TA',
            'MQY', 'STWD', 'ACRE', 'FLO', 'CPE', 'NX', 'NNY', 'PDI', 'USNA', 'BUI', 'BTZ', 'CHNR', 'CHMI', 'BCS', 'REX',
            'NUS', 'EDF', 'BLK', 'BMO', 'NXC', 'SPXX', 'ARDC', 'MTDR']
    if searched_stock not in companylist:
        res = {}
        for i in range(12):
            res[str(i)]=[0]*10
        return res
    df = pd.read_csv('stock_prices_pctch.csv')
    df_rev = -df.iloc[:,1:len(df.columns)] # Reversed sign so that ANNOY can also detect stocks that move opposite of each other.
    df_rev.rename(columns=lambda x: x+'_reversed', inplace=True)
    df_comb = pd.concat([df, df_rev], axis=1)
    Stocks = df_comb.columns[1:len(df_comb.columns)].to_numpy()
    Vectors = np.array([df_comb.iloc[:,i].to_numpy() for i in range(1,len(df_comb.columns))])

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

    t1 = time.time()
    index = AnnoyIndex(Vectors, Stocks)
    index.build()
    time.time()-t1

    # t1 = time.time()
    annoy_result = index.query(searched_stock, num_stocks)
    # time.time()-t1

    data = df # This is pd.read_csv('stock_prices_pctch.csv')
    data = data.drop('Date', axis=1)
    data = data.loc[len(data)-900:len(data)] # Keep only latest 900 days as training data.

    stocks = [annoy_result[i][0] for i in range(0, len(annoy_result))]
    similarities = [annoy_result[i][1] for i in range(0, len(annoy_result))]

    selected_data = data.loc[:, stocks]

    def estimate_var(df, lags=1):
        model = VAR(df)
        fitted_model = model.fit(lags)
        return fitted_model

    def irfs(model, side, length=10):
        '''Arguments:
            model: fitted var model object (returned by estimate_var()).
            side: Is the searched stock the impulse stock or response stock? 'impulse' or 'response'.
            length: requested number of periods in the IRFs. int > 0, default 10.
        '''
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

    irfs_dict = {} # Create dictionary to store final results.

    for i in range(len(similarities)):
        if similarities[i] < 0.2:
            similarities[i] = 5
        elif similarities[i] < 0.4:
            similarities[i] = 4
        elif similarities[i] < 0.6:
            similarities[i] = 3
        elif similarities[i] < 0.8:
            similarities[i] = 2
        else:
            similarities[i] = 1

    irfs_dict['Similarities'] = similarities # Add the similarity coefficients from ANNOY into result dictionary; 0=most similar, 1=least similar.

    # Recommend buy/sell based on cumulative IRFs:
    # Cumulative IRFs predict the total price change after x days.
    # Recommend buy if cumulative IRF is positive at least 90% of the time in next 10 days.
    # Recommend sell if cumulative IRF is positive less than 10% of the time in next 10 days.
    # Recommend neutral otherwise.
    recs = []
    for stock in stocks:
        irf = irfs_df.loc[:,stock].tolist()
        cum_irf = [sum(irf[1:i+1]) for i in range(1, len(irf))]
        num_positive = 0
        for i in range(0, len(cum_irf)):
            if cum_irf[i] > 0:
                num_positive += 1
        pct_positive = num_positive / len(cum_irf)
        if pct_positive >= 0.9:
            recs.append('Buy')
        elif pct_positive <= 0.1:
            recs.append('Sell')
        else:
            recs.append('Neutral')
    irfs_dict['Recommendations'] = recs

    # Put IRFs in dictionary:
    for stock in stocks:
        irfs_dict[stock] = irfs_df.loc[:,stock].tolist()
    return irfs_dict # This is the final result to be passed to the HTML file.
    # If the searched stock was the impulse, these represent the responses of the 10 stocks.
    # If the searched stock was the response, these represent the responses of the searched stock when each of the 10 stocks is the impulse.
    # Keys are stock names; values are vectors representing the IRF for the desired number of periods for the key.
    # The first element of each vector represents the response on day 0, i.e. the present day.  The following elements are the next 10 days.
