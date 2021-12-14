
function front(data) {
    var x, text;
    var result0;
    const keys = Object.keys(data)
    document.getElementById("introduction").innerHTML = ' ';
    document.getElementById("p1").innerHTML = ' ';

    var dataplot = data
    Data = {}
    Data[keys[0]] = data[keys[0]]
    Data[keys[1]] = data[keys[1]]
    for (let i = 2; i < keys.length; i++) {
        vals = []
        for (let j = 0; j < data[keys[2]].length; j++) {
            var tmp = data[keys[i]][j] * 10
            tmp = tmp.toFixed(5)
            tmp = String(tmp) + '%'
            vals.push(tmp)
        }
        Data[keys[i]] = vals
    }

    data = Data

    x = keys[2];
    const companylist = ['CSCO', 'SBGI', 'UFCS', 'GFED', 'AIRT', 'ISSC', 'KNDI', 'TRNS', 'AEIS', 'TROW', 'ISRG',
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
    var incompany = 0
    if (companylist.includes(x)) {
        incompany = 1;
    }
    const resultlist = keys
    const similar = data[keys[0]]
    const recommend = data[keys[1]]
    const valuelist1 = data[keys[2]].slice(-5)
    const valuelist2 = data[keys[3]].slice(-5)
    const valuelist3 = data[keys[4]].slice(-5)
    const valuelist4 = data[keys[5]].slice(-5)
    const valuelist5 = data[keys[6]].slice(-5)
    const valuelist6 = data[keys[7]].slice(-5)
    const valuelist7 = data[keys[8]].slice(-5)
    const valuelist8 = data[keys[9]].slice(-5)
    const valuelist9 = data[keys[10]].slice(-5)
    const valuelist10 = data[keys[11]].slice(-5)
    const responseresultlist = keys
    const responsevaluelist1 = data[keys[2]].slice(-5)
    const responsevaluelist2 = data[keys[3]].slice(-5)
    const responsevaluelist3 = data[keys[4]].slice(-5)
    const responsevaluelist4 = data[keys[5]].slice(-5)
    const responsevaluelist5 = data[keys[6]].slice(-5)
    const responsevaluelist6 = data[keys[7]].slice(-5)
    const responsevaluelist7 = data[keys[8]].slice(-5)
    const responsevaluelist8 = data[keys[9]].slice(-5)
    const responsevaluelist9 = data[keys[10]].slice(-5)
    const responsevaluelist10 = data[keys[11]].slice(-5)
    var select = document.getElementById("choose").value
    const result1 = "This table shows the stock price predictions of the most ten related companies by taking the input company as impulse."
    const result2 = "This table shows the stock price predictions of the most ten related companies by taking the input company as response."
    console.log(select)

    if (incompany == 0) {
        const result0 = "Please enter a valid company code. We only provide recommendations for stocks with at least 1000 days since public listed.";
        document.getElementById("demo").innerHTML = result0;
        document.getElementById("name1").innerHTML = "";
        document.getElementById("name2").innerHTML = "";
        document.getElementById("name3").innerHTML = "";
        document.getElementById("name4").innerHTML = "";
        document.getElementById("name5").innerHTML = "";
        document.getElementById("name6").innerHTML = "";
        document.getElementById("name7").innerHTML = "";
        document.getElementById("name8").innerHTML = "";
        document.getElementById("name9").innerHTML = "";
        document.getElementById("name10").innerHTML = "";
        document.getElementById("similar1").innerHTML = "";
        document.getElementById("similar2").innerHTML = "";
        document.getElementById("similar3").innerHTML = "";
        document.getElementById("similar4").innerHTML = "";
        document.getElementById("similar5").innerHTML = "";
        document.getElementById("similar6").innerHTML = "";
        document.getElementById("similar7").innerHTML = "";
        document.getElementById("similar8").innerHTML = "";
        document.getElementById("similar9").innerHTML = "";
        document.getElementById("similar10").innerHTML = "";
        document.getElementById("recommend1").innerHTML = "";
        document.getElementById("recommend2").innerHTML = "";
        document.getElementById("recommend3").innerHTML = "";
        document.getElementById("recommend4").innerHTML = "";
        document.getElementById("recommend5").innerHTML = "";
        document.getElementById("recommend6").innerHTML = "";
        document.getElementById("recommend7").innerHTML = "";
        document.getElementById("recommend8").innerHTML = "";
        document.getElementById("recommend9").innerHTML = "";
        document.getElementById("recommend10").innerHTML = "";
        document.getElementById("price11").innerHTML = "";
        document.getElementById("price12").innerHTML = "";
        document.getElementById("price13").innerHTML = "";
        document.getElementById("price14").innerHTML = "";
        document.getElementById("price15").innerHTML = "";
        document.getElementById("price21").innerHTML = "";
        document.getElementById("price22").innerHTML = "";
        document.getElementById("price23").innerHTML = "";
        document.getElementById("price24").innerHTML = "";
        document.getElementById("price25").innerHTML = "";
        document.getElementById("price31").innerHTML = "";
        document.getElementById("price32").innerHTML = "";
        document.getElementById("price33").innerHTML = "";
        document.getElementById("price34").innerHTML = "";
        document.getElementById("price35").innerHTML = "";
        document.getElementById("price41").innerHTML = "";
        document.getElementById("price42").innerHTML = "";
        document.getElementById("price43").innerHTML = "";
        document.getElementById("price44").innerHTML = "";
        document.getElementById("price45").innerHTML = "";
        document.getElementById("price51").innerHTML = "";
        document.getElementById("price52").innerHTML = "";
        document.getElementById("price53").innerHTML = "";
        document.getElementById("price54").innerHTML = "";
        document.getElementById("price55").innerHTML = "";
        document.getElementById("price61").innerHTML = "";
        document.getElementById("price62").innerHTML = "";
        document.getElementById("price63").innerHTML = "";
        document.getElementById("price64").innerHTML = "";
        document.getElementById("price65").innerHTML = "";
        document.getElementById("price71").innerHTML = "";
        document.getElementById("price72").innerHTML = "";
        document.getElementById("price73").innerHTML = "";
        document.getElementById("price74").innerHTML = "";
        document.getElementById("price75").innerHTML = "";
        document.getElementById("price81").innerHTML = "";
        document.getElementById("price82").innerHTML = "";
        document.getElementById("price83").innerHTML = "";
        document.getElementById("price84").innerHTML = "";
        document.getElementById("price85").innerHTML = "";
        document.getElementById("price91").innerHTML = "";
        document.getElementById("price92").innerHTML = "";
        document.getElementById("price93").innerHTML = "";
        document.getElementById("price94").innerHTML = "";
        document.getElementById("price95").innerHTML = "";
        document.getElementById("price101").innerHTML = "";
        document.getElementById("price102").innerHTML = "";
        document.getElementById("price103").innerHTML = "";
        document.getElementById("price104").innerHTML = "";
        document.getElementById("price105").innerHTML = "";
    } else {
        if (select=='impulse') {
            // document.getElementById("demo").innerHTML = result1;
            document.getElementById("name1").innerHTML = resultlist[2];
            document.getElementById("name2").innerHTML = resultlist[3];
            document.getElementById("name3").innerHTML = resultlist[4];
            document.getElementById("name4").innerHTML = resultlist[5];
            document.getElementById("name5").innerHTML = resultlist[6];
            document.getElementById("name6").innerHTML = resultlist[7];
            document.getElementById("name7").innerHTML = resultlist[8];
            document.getElementById("name8").innerHTML = resultlist[9];
            document.getElementById("name9").innerHTML = resultlist[10];
            document.getElementById("name10").innerHTML = resultlist[11];
            document.getElementById("similar1").innerHTML = similar[0];
            document.getElementById("similar2").innerHTML = similar[1];
            document.getElementById("similar3").innerHTML = similar[2];
            document.getElementById("similar4").innerHTML = similar[3];
            document.getElementById("similar5").innerHTML = similar[4];
            document.getElementById("similar6").innerHTML = similar[5];
            document.getElementById("similar7").innerHTML = similar[6];
            document.getElementById("similar8").innerHTML = similar[7];
            document.getElementById("similar9").innerHTML = similar[8];
            document.getElementById("similar10").innerHTML = similar[9];
            document.getElementById("recommend1").innerHTML = recommend[0];
            document.getElementById("recommend2").innerHTML = recommend[1];
            document.getElementById("recommend3").innerHTML = recommend[2];
            document.getElementById("recommend4").innerHTML = recommend[3];
            document.getElementById("recommend5").innerHTML = recommend[4];
            document.getElementById("recommend6").innerHTML = recommend[5];
            document.getElementById("recommend7").innerHTML = recommend[6];
            document.getElementById("recommend8").innerHTML = recommend[7];
            document.getElementById("recommend9").innerHTML = recommend[8];
            document.getElementById("recommend10").innerHTML = recommend[9];
            document.getElementById("price11").innerHTML = valuelist1[0];
            document.getElementById("price12").innerHTML = valuelist1[1];
            document.getElementById("price13").innerHTML = valuelist1[2];
            document.getElementById("price14").innerHTML = valuelist1[3];
            document.getElementById("price15").innerHTML = valuelist1[4];
            document.getElementById("price21").innerHTML = valuelist2[0];
            document.getElementById("price22").innerHTML = valuelist2[1];
            document.getElementById("price23").innerHTML = valuelist2[2];
            document.getElementById("price24").innerHTML = valuelist2[3];
            document.getElementById("price25").innerHTML = valuelist2[4];
            document.getElementById("price31").innerHTML = valuelist3[0];
            document.getElementById("price32").innerHTML = valuelist3[1];
            document.getElementById("price33").innerHTML = valuelist3[2];
            document.getElementById("price34").innerHTML = valuelist3[3];
            document.getElementById("price35").innerHTML = valuelist3[4];
            document.getElementById("price41").innerHTML = valuelist4[0];
            document.getElementById("price42").innerHTML = valuelist4[1];
            document.getElementById("price43").innerHTML = valuelist4[2];
            document.getElementById("price44").innerHTML = valuelist4[3];
            document.getElementById("price45").innerHTML = valuelist4[4];
            document.getElementById("price51").innerHTML = valuelist5[0];
            document.getElementById("price52").innerHTML = valuelist5[1];
            document.getElementById("price53").innerHTML = valuelist5[2];
            document.getElementById("price54").innerHTML = valuelist5[3];
            document.getElementById("price55").innerHTML = valuelist5[4];
            document.getElementById("price61").innerHTML = valuelist6[0];
            document.getElementById("price62").innerHTML = valuelist6[1];
            document.getElementById("price63").innerHTML = valuelist6[2];
            document.getElementById("price64").innerHTML = valuelist6[3];
            document.getElementById("price65").innerHTML = valuelist6[4];
            document.getElementById("price71").innerHTML = valuelist7[0];
            document.getElementById("price72").innerHTML = valuelist7[1];
            document.getElementById("price73").innerHTML = valuelist7[2];
            document.getElementById("price74").innerHTML = valuelist7[3];
            document.getElementById("price75").innerHTML = valuelist7[4];
            document.getElementById("price81").innerHTML = valuelist8[0];
            document.getElementById("price82").innerHTML = valuelist8[1];
            document.getElementById("price83").innerHTML = valuelist8[2];
            document.getElementById("price84").innerHTML = valuelist8[3];
            document.getElementById("price85").innerHTML = valuelist8[4];
            document.getElementById("price91").innerHTML = valuelist9[0];
            document.getElementById("price92").innerHTML = valuelist9[1];
            document.getElementById("price93").innerHTML = valuelist9[2];
            document.getElementById("price94").innerHTML = valuelist9[3];
            document.getElementById("price95").innerHTML = valuelist9[4];
            document.getElementById("price101").innerHTML = valuelist10[0];
            document.getElementById("price102").innerHTML = valuelist10[1];
            document.getElementById("price103").innerHTML = valuelist10[2];
            document.getElementById("price104").innerHTML = valuelist10[3];
            document.getElementById("price105").innerHTML = valuelist10[4];

        }
        if (select=='response') {
            // document.getElementById("demo").innerHTML = result2;
            document.getElementById("name1").innerHTML = responseresultlist[2];
            document.getElementById("name2").innerHTML = responseresultlist[3];
            document.getElementById("name3").innerHTML = responseresultlist[4];
            document.getElementById("name4").innerHTML = responseresultlist[5];
            document.getElementById("name5").innerHTML = responseresultlist[6];
            document.getElementById("name6").innerHTML = responseresultlist[7];
            document.getElementById("name7").innerHTML = responseresultlist[8];
            document.getElementById("name8").innerHTML = responseresultlist[9];
            document.getElementById("name9").innerHTML = responseresultlist[10];
            document.getElementById("name10").innerHTML = responseresultlist[11];
            document.getElementById("similar1").innerHTML = similar[0];
            document.getElementById("similar2").innerHTML = similar[1];
            document.getElementById("similar3").innerHTML = similar[2];
            document.getElementById("similar4").innerHTML = similar[3];
            document.getElementById("similar5").innerHTML = similar[4];
            document.getElementById("similar6").innerHTML = similar[5];
            document.getElementById("similar7").innerHTML = similar[6];
            document.getElementById("similar8").innerHTML = similar[7];
            document.getElementById("similar9").innerHTML = similar[8];
            document.getElementById("similar10").innerHTML = similar[9];
            document.getElementById("recommend1").innerHTML = recommend[0];
            document.getElementById("recommend2").innerHTML = recommend[1];
            document.getElementById("recommend3").innerHTML = recommend[2];
            document.getElementById("recommend4").innerHTML = recommend[3];
            document.getElementById("recommend5").innerHTML = recommend[4];
            document.getElementById("recommend6").innerHTML = recommend[5];
            document.getElementById("recommend7").innerHTML = recommend[6];
            document.getElementById("recommend8").innerHTML = recommend[7];
            document.getElementById("recommend9").innerHTML = recommend[8];
            document.getElementById("recommend10").innerHTML = recommend[9];
            document.getElementById("price11").innerHTML = responsevaluelist1[0];
            document.getElementById("price12").innerHTML = responsevaluelist1[1];
            document.getElementById("price13").innerHTML = responsevaluelist1[2];
            document.getElementById("price14").innerHTML = responsevaluelist1[3];
            document.getElementById("price15").innerHTML = responsevaluelist1[4];
            document.getElementById("price21").innerHTML = responsevaluelist2[0];
            document.getElementById("price22").innerHTML = responsevaluelist2[1];
            document.getElementById("price23").innerHTML = responsevaluelist2[2];
            document.getElementById("price24").innerHTML = responsevaluelist2[3];
            document.getElementById("price25").innerHTML = responsevaluelist2[4];
            document.getElementById("price31").innerHTML = responsevaluelist3[0];
            document.getElementById("price32").innerHTML = responsevaluelist3[1];
            document.getElementById("price33").innerHTML = responsevaluelist3[2];
            document.getElementById("price34").innerHTML = responsevaluelist3[3];
            document.getElementById("price35").innerHTML = responsevaluelist3[4];
            document.getElementById("price41").innerHTML = responsevaluelist4[0];
            document.getElementById("price42").innerHTML = responsevaluelist4[1];
            document.getElementById("price43").innerHTML = responsevaluelist4[2];
            document.getElementById("price44").innerHTML = responsevaluelist4[3];
            document.getElementById("price45").innerHTML = responsevaluelist4[4];
            document.getElementById("price51").innerHTML = responsevaluelist5[0];
            document.getElementById("price52").innerHTML = responsevaluelist5[1];
            document.getElementById("price53").innerHTML = responsevaluelist5[2];
            document.getElementById("price54").innerHTML = responsevaluelist5[3];
            document.getElementById("price55").innerHTML = responsevaluelist5[4];
            document.getElementById("price61").innerHTML = responsevaluelist6[0];
            document.getElementById("price62").innerHTML = responsevaluelist6[1];
            document.getElementById("price63").innerHTML = responsevaluelist6[2];
            document.getElementById("price64").innerHTML = responsevaluelist6[3];
            document.getElementById("price65").innerHTML = responsevaluelist6[4];
            document.getElementById("price71").innerHTML = responsevaluelist7[0];
            document.getElementById("price72").innerHTML = responsevaluelist7[1];
            document.getElementById("price73").innerHTML = responsevaluelist7[2];
            document.getElementById("price74").innerHTML = responsevaluelist7[3];
            document.getElementById("price75").innerHTML = responsevaluelist7[4];
            document.getElementById("price81").innerHTML = responsevaluelist8[0];
            document.getElementById("price82").innerHTML = responsevaluelist8[1];
            document.getElementById("price83").innerHTML = responsevaluelist8[2];
            document.getElementById("price84").innerHTML = responsevaluelist8[3];
            document.getElementById("price85").innerHTML = responsevaluelist8[4];
            document.getElementById("price91").innerHTML = responsevaluelist9[0];
            document.getElementById("price92").innerHTML = responsevaluelist9[1];
            document.getElementById("price93").innerHTML = responsevaluelist9[2];
            document.getElementById("price94").innerHTML = responsevaluelist9[3];
            document.getElementById("price95").innerHTML = responsevaluelist9[4];
            document.getElementById("price101").innerHTML = responsevaluelist10[0];
            document.getElementById("price102").innerHTML = responsevaluelist10[1];
            document.getElementById("price103").innerHTML = responsevaluelist10[2];
            document.getElementById("price104").innerHTML = responsevaluelist10[3];
            document.getElementById("price105").innerHTML = responsevaluelist10[4];
        }

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 100, bottom: 30, left: 30},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Read the data
    var Data = dataplot
    delete Data['Similarities']
    delete Data['Recommendations']
    const keys = Object.keys(Data);
    Data.time = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    var data = []
    for (let i = 1; i < Data[keys[0]].length; i++) {
        ele = {}
        for (let j = 0; j < keys.length; j++) {
            ele[keys[j]] = Data[keys[j]][i]
            ele.time = Data.time[i - 1]
        }
        data.push(ele);
    }

    // List of groups (here I have one group per column)
    var allGroup = keys

    // Reformat the data: we need an array of arrays of {x, y} tuples
    var dataReady = allGroup.map(function (grpName) { // .map allows to do something for each element of the list
        return {
            name: grpName,
            values: data.map(function (d) {
                return {time: d.time, value: +d[grpName]};
            })
        };
    });

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
        .domain(allGroup)
        .range(d3.schemeTableau10);

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
        .domain([0, Data[keys[0]].length + 4])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var lowest = keys.map(function (x) {
        return Math.min(...Data[x].slice(-5))
    });
    var highest = keys.map(function (x) {
        return Math.max(...Data[x].slice(-5))
    });
    y_min = Math.min(...lowest) * 1.5
    y_max = Math.max(...highest) * 1.5
    var y = d3.scaleLinear()
        .domain([y_min, y_max])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add the lines
    var line = d3.line()
        .x(function (d) {
            return x(+d.time)
        })
        .y(function (d) {
            return y(+d.value)
        })
    svg.selectAll("myLines")
        .data(dataReady)
        .enter()
        .append("path")
        .attr("class", function (d) {
            return d.name
        })
        .attr("d", function (d) {
            return line(d.values)
        })
        .attr("stroke", function (d) {
            return myColor(d.name)
        })
        .style("stroke-width", 4)
        .style("fill", "none")

    // Add the points
    svg
        // First we need to enter in a group
        .selectAll("myDots")
        .data(dataReady)
        .enter()
        .append('g')
        .style("fill", function (d) {
            return myColor(d.name)
        })
        .attr("class", function (d) {
            return d.name
        })
        // Second we need to enter in the 'values' part of this group
        .selectAll("myPoints")
        .data(function (d) {
            return d.values
        })
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return x(d.time)
        })
        .attr("cy", function (d) {
            return y(d.value)
        })
        .attr("r", 5)
        .attr("stroke", "white")

    svg
        .selectAll("myLegend")
        .data(dataReady)
        .enter()
        .append('g')
        .append("text")
        .attr('x', 400)
        .attr('y', function (d, i) {
            return 30 + i * 20
        })
        .text(function (d) {
            return d.name;
        })
        .style("fill", function (d) {
            return myColor(d.name)
        })
        .style("font-size", 15)
        .on("click", function (d) {
            // is the element currently visible ?
            currentOpacity = d3.selectAll("." + d.name).style("opacity")
            // Change the opacity: from 0 to 1 or from 1 to 0
            d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0 : 1)

        })
}
}
