// Layers

var teyvatarray = ['castle','tower','sidequest','altarofmemories','signpost','historicsite','occupiedsite','drogon',
'bountie','banditcamp','enemyhideout','gerociousbeast','echoesofthepast','godhaven','lostletter','citymysteries','beyondthewall','wormwalks',

'castlereach','towerreach','sidequestreach','altarofmemoriesreach','signpostreach','historicsitereach','occupiedsitereach',
'bountiereach','banditcampreach','enemyhideoutreach','gerociousbeastreach','echoesofthepastreach','godhavenreach','lostletterreach','citymysteriesreach',

'castleredkeep','signpostredkeep',
];

// Initialisation des Markers

var initDatas = {
castle:{List:'castle', Icon:'castle', Grp:'castle', Title:langue.cat01, Filename:'castle', Cbx:'castle'},
tower:{List:'tower', Icon:'tower', Grp:'tower', Title:langue.cat02, Filename:'tower', Cbx:'tower'},
sidequest:{List:'sidequest', Icon:'sidequest', Grp:'sidequest', Title:langue.cat03, Filename:'sidequest', Cbx:'sidequest'},
altarofmemories:{List:'altarofmemories', Icon:'altarofmemories', Grp:'altarofmemories', Title:langue.cat146, Filename:'altarofmemories', Cbx:'altarofmemories'},
signpost:{List:'signpost', Icon:'signpost', Grp:'signpost', Title:langue.cat04, Filename:'signpost', Cbx:'signpost'},
historicsite:{List:'historicsite', Icon:'historicsite', Grp:'historicsite', Title:langue.cat05, Filename:'historicsite', Cbx:'historicsite'},
occupiedsite:{List:'occupiedsite', Icon:'occupiedsite', Grp:'occupiedsite', Title:langue.cat06, Filename:'occupiedsite', Cbx:'occupiedsite'},
bountie:{List:'bountie', Icon:'bountie', Grp:'bountie', Title:langue.cat07, Filename:'bountie', Cbx:'bountie'},
banditcamp:{List:'banditcamp', Icon:'banditcamp', Grp:'banditcamp', Title:langue.cat08, Filename:'banditcamp', Cbx:'banditcamp'},
enemyhideout:{List:'enemyhideout', Icon:'enemyhideout', Grp:'enemyhideout', Title:langue.cat09, Filename:'enemyhideout', Cbx:'enemyhideout'},
gerociousbeast:{List:'gerociousbeast', Icon:'gerociousbeast', Grp:'gerociousbeast', Title:langue.cat10, Filename:'gerociousbeast', Cbx:'gerociousbeast'},
echoesofthepast:{List:'echoesofthepast', Icon:'echoesofthepast', Grp:'echoesofthepast', Title:langue.cat11, Filename:'echoesofthepast', Cbx:'echoesofthepast'},
godhaven:{List:'godhaven', Icon:'godhaven', Grp:'godhaven', Title:langue.cat12, Filename:'godhaven', Cbx:'godhaven'},
lostletter:{List:'lostletter', Icon:'lostletter', Grp:'lostletter', Title:langue.cat13, Filename:'lostletter', Cbx:'lostletter'},
citymysteries:{List:'citymysteries', Icon:'citymysteries', Grp:'citymysteries', Title:langue.cat14, Filename:'citymysteries', Cbx:'citymysteries'},
beyondthewall:{List:'beyondthewall', Icon:'beyondthewall', Grp:'beyondthewall', Title:langue.cat15, Filename:'beyondthewall', Cbx:'beyondthewall'},
wormwalks:{List:'wormwalks', Icon:'wormwalks', Grp:'wormwalks', Title:langue.cat16, Filename:'wormwalks', Cbx:'wormwalks'},
drogon:{List:'drogon', Icon:'drogon', Grp:'drogon', Title:langue.cat17, Filename:'drogon', Cbx:'drogon'},


castlereach:{List:'castlereach', Icon:'castle', Grp:'castlereach', Title:langue.cat01, Filename:'castlereach', Cbx:'castlereach'},
towerreach:{List:'towerreach', Icon:'tower', Grp:'towerreach', Title:langue.cat02, Filename:'towerreach', Cbx:'towerreach'},
sidequestreach:{List:'sidequestreach', Icon:'sidequest', Grp:'sidequest', Title:langue.cat03, Filename:'sidequestreach'},
altarofmemoriesreach:{List:'altarofmemoriesreach', Icon:'altarofmemories', Grp:'altarofmemoriesreach', Title:langue.cat146, Filename:'altarofmemories', Cbx:'altarofmemoriesreach'},
signpostreach:{List:'signpostreach', Icon:'signpost', Grp:'signpostreach', Title:langue.cat04, Filename:'signpostreach'},
historicsitereach:{List:'historicsitereach', Icon:'historicsite', Grp:'historicsitereach', Title:langue.cat05, Filename:'historicsitereach'},
occupiedsitereach:{List:'occupiedsitereach', Icon:'occupiedsite', Grp:'occupiedsitereach', Title:langue.cat06, Filename:'occupiedsitereach', Cbx:'occupiedsitereach'},
bountiereach:{List:'bountiereach', Icon:'bountie', Grp:'bountiereach', Title:langue.cat07, Filename:'bountiereach', Cbx:'bountiereach'},
banditcampreach:{List:'banditcampreach', Icon:'banditcamp', Grp:'banditcampreach', Title:langue.cat08, Filename:'banditcampreach', Cbx:'banditcampreach'},
enemyhideoutreach:{List:'enemyhideoutreach', Icon:'enemyhideout', Grp:'enemyhideoutreach', Title:langue.cat09, Filename:'enemyhideoutreach', Cbx:'enemyhideoutreach'},
gerociousbeastreach:{List:'gerociousbeastreach', Icon:'gerociousbeast', Grp:'gerociousbeastreach', Title:langue.cat10, Filename:'gerociousbeastreach', Cbx:'gerociousbeastreach'},
echoesofthepastreach:{List:'echoesofthepastreach', Icon:'echoesofthepast', Grp:'echoesofthepastreach', Title:langue.cat11, Filename:'echoesofthepastreach', Cbx:'echoesofthepastreach'},
godhavenreach:{List:'godhavenreach', Icon:'godhaven', Grp:'godhavenreach', Title:langue.cat12, Filename:'godhavenreach', Cbx:'godhavenreach'},
lostletterreach:{List:'lostletterreach', Icon:'lostletter', Grp:'lostletterreach', Title:langue.cat13, Filename:'lostletterreach', Cbx:'lostletterreach'},
citymysteriesreach:{List:'citymysteriesreach', Icon:'citymysteries', Grp:'citymysteriesreach', Title:langue.cat14, Filename:'citymysteriesreach', Cbx:'citymysteriesreach'},

castleredkeep:{List:'castleredkeep', Icon:'castle', Grp:'castleredkeep', Title:langue.cat15, Filename:'castleredkeep', Cbx:'castleredkeep'},
signpostredkeep:{List:'signpostredkeep', Icon:'signpost', Grp:'signpostredkeep', Title:langue.cat16, Filename:'signpostredkeep', Cbx:'signpostredkeep'},

};


// Liste des Marqueurs 


// Nord

var listdrogon = [

		[0,[10156,5018],{id:'000322', mid:'01', title:"Drogon WorldBoss"}]

];

var listbeyondthewall = [

		[0,[8798, 602],{id:'000320',mid:'01'}],

];

var listwormwalks = [

		[0,[9094, 692],{id:'00321',mid:'01'}],

];
// Castle

var listcastle = [

		[0,[9216, 2019],{id:'00001',mid:'01'}],
		[0,[7548, 4287],{id:'00002',mid:'02'}],
		
		[0,[9272, 3395],{id:'00003',mid:'03'}],
		[0,[8754, 5383],{id:'00004',mid:'04'}],
];

// Tower

var listtower = [
	
			[0,[8727, 593],{id:'00005',mid:'01'}],
			[0,[9128, 1204],{id:'00006',mid:'02'}],
			[0,[7570, 3507],{id:'00007',mid:'03'}],
		
			[0,[6321, 4270],{id:'00008',mid:'04'}],
			[0,[6475, 4635],{id:'00009',mid:'05'}],
			[0,[7834, 4593],{id:'00010',mid:'06'}],

			[0,[8934, 4046],{id:'00011',mid:'07'}],
			[0,[9379, 4660],{id:'00012',mid:'08'}],
];

// Sidequest

var listsidequest = [

		[0,[0, 0],{id:'00013',mid:'01'}]
];

// Accès Altar of memories

var listaltarofmemories =  [

	[0,[7622, 4224],{id:'00014',mid:'01'}] 
];

// Sign Post

var listsignpost = [

		[0,[8682, 610],{id:'00015',mid:'01'}],
		[0,[9064, 686],{id:'00016',mid:'02'}],
		[0,[8525, 1124],{id:'00017',mid:'03'}],
		[0,[8904, 1055],{id:'00018',mid:'04'}],
		[0,[9096, 1175],{id:'00019',mid:'05'}],
		[0,[8847, 1633],{id:'00020',mid:'06'}],
		[0,[9101, 1766],{id:'00021',mid:'07'}],
		[0,[9095, 1939],{id:'00022',mid:'08'}],
		[0,[8639, 2254],{id:'00023',mid:'09'}],
		[0,[7619, 3524],{id:'00024',mid:'10'}],
		[0,[8422, 1618],{id:'00025',mid:'11'}],
		[0,[8321, 1686],{id:'00026',mid:'12'}],
	
		[0,[5990, 4482],{id:'00027',mid:'13'}],
		[0,[6127, 4679],{id:'00028',mid:'14'}],
		[0,[6209, 4791],{id:'00029',mid:'15'}],
		[0,[6367, 4613],{id:'00030',mid:'16'}],
		[0,[6525, 4524],{id:'00031',mid:'17'}],
		[0,[6317, 4356],{id:'00032',mid:'18'}],
		[0,[6835, 4545],{id:'00033',mid:'19'}],
	
		[0,[7364, 4664],{id:'00034',mid:'20'}],
		[0,[7554, 4830],{id:'00035',mid:'21'}],
		[0,[7560, 4614],{id:'00036',mid:'22'}],
		[0,[7552, 4343],{id:'00037',mid:'23'}],
		[0,[7574, 4102],{id:'00038',mid:'24'}],
		[0,[7771, 4143],{id:'00039',mid:'25'}],
		[0,[7847, 4658],{id:'00040',mid:'26'}],
		[0,[8178, 4281],{id:'00041',mid:'27'}],
		[0,[6628, 3769],{id:'00042',mid:'28'}],
		[0,[6844, 4035],{id:'00043',mid:'29'}],
	
		[0,[8276, 4794],{id:'00044',mid:'30'}],
		[0,[8638, 3899],{id:'00045',mid:'31'}],	
		[0,[9330, 3043],{id:'00046',mid:'32'}],
		[0,[9774, 3040],{id:'00047',mid:'33'}],
		[0,[9578, 3167],{id:'00048',mid:'34'}],
		[0,[9426, 3307],{id:'00049',mid:'35'}],
		[0,[9251, 3461],{id:'00050',mid:'36'}],
		[0,[9740, 3412],{id:'00051',mid:'37'}],
		[0,[9818, 3599],{id:'00052',mid:'38'}],
		[0,[9260, 3748],{id:'00053',mid:'39'}],
		[0,[9369, 4236],{id:'00054',mid:'40'}],
		[0,[9561, 4208],{id:'00055',mid:'41'}],
		[0,[9625, 4493],{id:'00056',mid:'42'}],
		[0,[9104, 4483],{id:'00057',mid:'43'}],
		[0,[9029, 4797],{id:'00058',mid:'44'}],
		[0,[9305, 4916],{id:'00059',mid:'45'}],
		[0,[9521, 4789],{id:'00060',mid:'46'}],
		[0,[9974, 4721],{id:'00061',mid:'47'}],
		[0,[9213, 5143],{id:'00062',mid:'48'}],
		[0,[8435, 5307],{id:'00063',mid:'49'}],
		[0,[8656, 5466],{id:'00064',mid:'50'}],
		[0,[9008, 5416],{id:'00065',mid:'51'}], 
	
		[0,[7096, 4268],{id:'00066',mid:'52'}], 
		[0,[7556, 4816],{id:'00067',mid:'53'}],
];

// Spot Historic Site

var listhistoricsite = [

		[0,[8844, 1216],{id:'00068',mid:'01'}],
		[0,[8583, 1738],{id:'00069',mid:'02'}],

		[0,[6956, 4779],{id:'00070',mid:'03'}],
		[0,[7491, 5045],{id:'00071',mid:'04'}],
		[0,[7124, 4138],{id:'00072',mid:'05'}],
	
		[0,[9586, 2967],{id:'00073',mid:'06'}],
		[0,[9342, 3915],{id:'00074',mid:'07'}],
		
];

// occupiedsite

var listoccupiedsite = [

		[0,[8123, 4212],{id:'00075',mid:'01'}],
		[0,[7309, 4754],{id:'00076',mid:'02'}],
		[0,[6093, 4720],{id:'00077',mid:'03'}],
		[0,[6848, 3959],{id:'00078',mid:'04'}],
	

];

// bounties

var listbountie = [

		[0,[0, 0],{id:'00079',mid:'01'}],

		
];

// banditcamp

var listbanditcamp = [

		[0,[8689, 1465],{id:'00080',mid:'01'}],
		[0,[8729, 868],{id:'00081',mid:'02'}],
		[0,[7459, 4874],{id:'00082',mid:'03'}],
		
		[0,[9390, 3083],{id:'00083',mid:'03'}],
		
		[0,[9648, 3200],{id:'00084',mid:'04'}],
		[0,[9715, 4467],{id:'00085',mid:'05'}],
		[0,[9225, 5195],{id:'00086',mid:'06'}],
		

];

// enemyhideout

var listenemyhideout = [

		[0,[5868, 4460],{id:'00087',mid:'02'}],
		
		[0,[9094, 3059],{id:'00088',mid:'03'}],

];

// gerociousbeast

var listgerociousbeast = [

		[0,[9171, 1615],{id:'00089',mid:'01'}],
		[0,[9492, 2671],{id:'00090',mid:'02'}],
		

];

// echoesofthepast

var listechoesofthepast = [

		[0,[8655, 1935],{id:'00091',mid:'01'}],
		
		[0,[6651, 4065],{id:'00092',mid:'02'}],
		[0,[8450, 4416],{id:'00093',mid:'03'}],
		
		[0,[9812, 3333],{id:'00094',mid:'04'}],
		

];

// godhaven

var listgodhaven = [

		[0,[8242, 4019],{id:'00095',mid:'01'}],
		[0,[5949, 4527],{id:'00096',mid:'02'}],

];

// lostletter

var listlostletter = [

		[0,[8327, 1652],{id:'00097',mid:'01'}],
		[0,[8411, 1774],{id:'00098',mid:'02'}],
		[0,[8530, 1817],{id:'00099',mid:'03'}],
		[0,[8527, 1637],{id:'00100',mid:'05'}],
		[0,[8902, 1573],{id:'00101',mid:'06'}],
		[0,[8853, 1732],{id:'00102',mid:'07'}],
		[0,[8782, 1939],{id:'00103',mid:'08'}],
		[0,[8956, 1981],{id:'00104',mid:'09'}],
		[0,[8975, 2043],{id:'00105',mid:'10'}],
		[0,[9161, 1982],{id:'00106',mid:'11'}],
		[0,[8656, 2216],{id:'00107',mid:'12'}],
		
		[0,[6187, 4491],{id:'00108',mid:'13'}],
		[0,[6466, 4369],{id:'00109',mid:'14'}],
		[0,[6480, 3946],{id:'00110',mid:'15'}],
		[0,[7014, 4080],{id:'00111',mid:'16'}],
		[0,[6880, 4367],{id:'00112',mid:'17'}],
		[0,[6883, 4690],{id:'00113',mid:'18'}],
		[0,[7183, 4637],{id:'00114',mid:'19'}],
		[0,[7331, 4644],{id:'00115',mid:'20'}],
		[0,[7258, 4466],{id:'00116',mid:'21'}],
		[0,[7171, 4238],{id:'00117',mid:'22'}],
		[0,[7615, 5044],{id:'00118',mid:'23'}],
		[0,[7795, 4761],{id:'00119',mid:'24'}],
		[0,[7796, 4629],{id:'00120',mid:'25'}],
		[0,[7845, 4568],{id:'00121',mid:'26'}],
		[0,[8005, 4515],{id:'00122',mid:'27'}],
		[0,[7968, 4018],{id:'00123',mid:'28'}],
		[0,[8250, 4196],{id:'00124',mid:'29'}],
		[0,[7502, 3802],{id:'00125',mid:'30'}],
		[0,[7755, 3627],{id:'00126',mid:'31'}],
		[0,[7690, 3456],{id:'00127',mid:'32'}],

		[0,[9360, 2573],{id:'00128',mid:'33'}],
		[0,[9343, 3091],{id:'00129',mid:'34'}],
		[0,[9805, 2935],{id:'00130',mid:'35'}],
		[0,[9345, 3414],{id:'00131',mid:'36'}],
		[0,[9248, 3520],{id:'00132',mid:'37'}],
		[0,[9134, 3754],{id:'00133',mid:'38'}],
		[0,[9521, 3907],{id:'00134',mid:'39'}],
		[0,[9224, 4052],{id:'00135',mid:'40'}],
		[0,[8628, 3906],{id:'00136',mid:'41'}],
		[0,[8805, 4139],{id:'00137',mid:'42'}],
		[0,[9439, 4275],{id:'00138',mid:'43'}],
		[0,[9652, 4143],{id:'00139',mid:'44'}],
		[0,[9821, 4217],{id:'00140',mid:'45'}],
		[0,[10015, 4041],{id:'00141',mid:'46'}],
		[0,[10022, 4569],{id:'00141',mid:'48'}],
		[0,[9974, 4712],{id:'00142',mid:'49'}],
		[0,[9487, 4655],{id:'00143',mid:'50'}],
		[0,[9444, 4648],{id:'00144',mid:'51'}],
		[0,[9373, 4662],{id:'00145',mid:'52'}],
		[0,[9381, 4763],{id:'00146',mid:'53'}],
		[0,[8141, 4653],{id:'00147',mid:'54'}],
		[0,[8114, 4923],{id:'00148',mid:'55'}],
		[0,[8512, 5041],{id:'00149',mid:'56'}],
		[0,[8334, 5140],{id:'00150',mid:'57'}],
		[0,[8463, 5272],{id:'00151',mid:'58'}],
		[0,[8418, 5471],{id:'00152',mid:'59'}],
		[0,[8655, 5437],{id:'00153',mid:'60'}],
		[0,[8625, 5605],{id:'00154',mid:'61'}],
		[0,[8818, 5571],{id:'00155',mid:'62'}],
		[0,[8905, 5515],{id:'00156',mid:'63'}],
		[0,[9015, 5261],{id:'00157',mid:'64'}],
		[0,[9224, 5292],{id:'00158',mid:'65'}],
		[0,[9189, 5436],{id:'00159',mid:'66'}],
		[0,[9123, 5549],{id:'00160',mid:'67'}],
		[0,[9041, 5018],{id:'00161',mid:'68'}],


];

// citymysteries

var listcitymysteries = [

		[0,[0, 0],{id:'00162',mid:'01'}],

];







// reach /////////////////////






// Castle

var listcastlereach = [

		[0,[5688, 14205],{id:'00163',mid:'01'}],
		[0,[5706, 12778],{id:'00164',mid:'02'}],
		[0,[6724, 12390],{id:'00165',mid:'03'}],

];

// Tower

var listtowerreach = [
	
			[0,[5255, 13392],{id:'00166',mid:'01'}],
			[0,[6298,12990],{id:'00167',mid:'02'}],

];

// Sidequest

var listsidequestreach = [

		[0,[0, 0],{id:'00168',mid:'01'}]
];

// Accès Altar of memories

var listaltarofmemoriesreach =  [

	[0,[7622, 4224],{id:'00169',mid:'01'}] 
];

// Sign Post

var listsignpostreach = [

		[0,[6160, 14924],{id:'00178',mid:'01'}],
		[0,[5940, 14803],{id:'00179',mid:'02'}],
		[0,[5617, 14856],{id:'00180',mid:'03'}],
		[0,[6053, 14652],{id:'00181',mid:'04'}],
		[0,[6237, 14548],{id:'00182',mid:'05'}],
		[0,[5787, 14628],{id:'00183',mid:'06'}],
		[0,[5479, 14658],{id:'00184',mid:'07'}],
		[0,[5792, 14399],{id:'00185',mid:'08'}],
		[0,[5664, 14222],{id:'00186',mid:'09'}],
		[0,[5921, 14072],{id:'00187',mid:'10'}],
		[0,[6268, 13928],{id:'00188',mid:'11'}],
		[0,[5540, 13963],{id:'00189',mid:'12'}],
		[0,[5736, 13832],{id:'00190',mid:'13'}],
		[0,[5899, 13508],{id:'00191',mid:'14'}],
		[0,[4851, 13842],{id:'00192',mid:'15'}],
		[0,[4728, 13651],{id:'00193',mid:'16'}],
		[0,[4995, 13599],{id:'00194',mid:'17'}],
		[0,[4633, 13244],{id:'00195',mid:'18'}],
		[0,[5170, 13205],{id:'00196',mid:'19'}],
		[0,[5017, 13012],{id:'00197',mid:'20'}],
		[0,[5683, 12885],{id:'00198',mid:'21'}],
		[0,[5497, 12543],{id:'00199',mid:'22'}],
		[0,[5090, 12501],{id:'00200',mid:'23'}],
		[0,[5966, 13079],{id:'00201',mid:'24'}],
		[0,[6300, 13037],{id:'00202',mid:'25'}],
		[0,[6384, 12925],{id:'00203',mid:'26'}],
		[0,[6787, 12959],{id:'00204',mid:'27'}],
		[0,[6248, 12632],{id:'00205',mid:'28'}],
		[0,[6144, 12382],{id:'00206',mid:'29'}],
		[0,[6793, 12437],{id:'00207',mid:'30'}],
		[0,[7062, 12646],{id:'00208',mid:'31'}],
		[0,[7365, 12828],{id:'00209',mid:'32'}],
		[0,[7062, 12345],{id:'00210',mid:'33'}],
		[0,[7369, 12436],{id:'00211',mid:'34'}],
		[0,[7384, 12114],{id:'00212',mid:'35'}],
		[0,[7222, 11910],{id:'00213',mid:'36'}],
		[0,[7041, 11985],{id:'00214',mid:'37'}],
		[0,[5412, 13433],{id:'00215',mid:'38'}],
		[0,[5568, 13171],{id:'00216',mid:'39'}],
];

// Spot Historic Site

var listhistoricsitereach = [

		[0,[5509, 15051],{id:'00231',mid:'01'}],
		[0,[6094, 14386],{id:'00232',mid:'02'}],
		[0,[6144, 13682],{id:'00233',mid:'03'}],
		[0,[5548, 13653],{id:'00234',mid:'04'}],
		[0,[4872, 13259],{id:'00235',mid:'05'}],
		[0,[5308, 12831],{id:'00236',mid:'06'}],
		[0,[6026, 12205],{id:'00237',mid:'07'}],
		[0,[7441, 12293],{id:'00238',mid:'08'}],

];

// occupiedsite

var listoccupiedsitereach = [

		[0,[5447, 14699],{id:'00170',mid:'01'}],
		[0,[6136, 15014],{id:'00171',mid:'02'}],
		[0,[4664, 13709],{id:'00172',mid:'03'}],
		[0,[5191, 13073],{id:'00173',mid:'04'}],
		[0,[5128, 12518],{id:'00174',mid:'05'}],
		[0,[6852, 13016],{id:'00175',mid:'06'}],
		[0,[6240, 12375],{id:'00176',mid:'07'}],
		[0,[7168, 11888],{id:'00177',mid:'08'}],

];

// bounties

var listbountiereach = [

		[0,[7102,12770],{id:'00231',mid:'01'}],
		
];

// banditcamp

var listbanditcampreach = [

		[0,[4619, 13260],{id:'00223',mid:'01'}],
		[0,[6293, 14021],{id:'00224',mid:'02'}],
		[0,[7254, 12796],{id:'00225',mid:'03'}],
		

];

// enemyhideout

var listenemyhideoutreach = [

		[0,[6334, 14787],{id:'00219',mid:'01'}],
		[0,[4560, 12968],{id:'00220',mid:'02'}],
		[0,[7506, 12878],{id:'00221',mid:'03'}],
		
];

// gerociousbeast

var listgerociousbeastreach = [

		[0,[4530, 13699],{id:'00217',mid:'01'}],
		[0,[6330, 14552],{id:'00218',mid:'2'}],


];

// echoesofthepast

var listechoesofthepastreach = [

		[0,[6054, 13911],{id:'00226',mid:'01'}],
		[0,[4829, 12707],{id:'00227',mid:'02'}],
		[0,[7226, 12077],{id:'00228',mid:'03'}],

		

];

// godhaven

var listgodhavenreach = [

		[0,[6463, 13769],{id:'00228',mid:'01'}],
		[0,[5664, 12558],{id:'00229',mid:'02'}],
		[0,[7404, 12590],{id:'00230',mid:'03'}],

];

// lostletter

var listlostletterreach = [

		[0,[5102, 14734],{id:'00239',mid:'01'}],
		[0,[5227, 14869],{id:'00240',mid:'02'}],
		[0,[5351, 15003],{id:'00241',mid:'03'}],
		[0,[5441, 14897],{id:'00242',mid:'04'}],
		[0,[5376, 14827],{id:'00243',mid:'05'}],
		[0,[5639, 14600],{id:'00244',mid:'06'}],
		[0,[5802, 14695],{id:'00245',mid:'07'}],
		[0,[5724, 14497],{id:'00246',mid:'08'}],
		[0,[5838, 14534],{id:'00247',mid:'09'}],
		[0,[5788, 14976],{id:'00248',mid:'10'}],
		[0,[5842, 15044],{id:'00249',mid:'11'}],
		[0,[5954, 15061],{id:'00250',mid:'12'}],
		[0,[6057, 15041],{id:'00251',mid:'13'}],
		[0,[6068, 14786],{id:'00252',mid:'14'}],
		[0,[6260, 14821],{id:'00253',mid:'15'}],
		[0,[6074, 14687],{id:'00254',mid:'16'}],
		[0,[6299, 14529],{id:'00255',mid:'17'}],
		[0,[6185, 14456],{id:'00256',mid:'18'}],
		[0,[5528, 14309],{id:'00257',mid:'19'}],
		[0,[5844, 14159],{id:'00258',mid:'20'}],
		[0,[6343, 13787],{id:'00259',mid:'21'}],
		[0,[5982, 13954],{id:'00260',mid:'22'}],
		[0,[5858, 13990],{id:'00261',mid:'23'}],
		[0,[5628, 13963],{id:'00262',mid:'24'}],
		[0,[5357, 14085],{id:'00263',mid:'25'}],
		
		[0,[4492, 14122],{id:'00264',mid:'26'}],
		[0,[4567, 13674],{id:'00265',mid:'27'}],
		[0,[4736, 13727],{id:'00266',mid:'28'}],
		[0,[4804, 13815],{id:'00267',mid:'29'}],
		[0,[4966, 13736],{id:'00268',mid:'30'}],
		[0,[5277, 13766],{id:'00269',mid:'31'}],
		[0,[5279, 13583],{id:'00270',mid:'32'}],
		[0,[5463, 13664],{id:'00271',mid:'33'}],
		[0,[5805, 13549],{id:'00272',mid:'34'}],
		[0,[5967, 13479],{id:'00273',mid:'35'}],
		[0,[4773, 13348],{id:'00274',mid:'36'}],
		[0,[5162, 13359],{id:'00275',mid:'37'}],
		[0,[5564, 13248],{id:'00276',mid:'38'}],
		[0,[5741, 13056],{id:'00277',mid:'39'}],
		[0,[4896, 13172],{id:'00278',mid:'40'}],
		[0,[4711, 12948],{id:'00279',mid:'41'}],
		[0,[4845, 13047],{id:'00280',mid:'42'}],
		[0,[5124, 13074],{id:'00281',mid:'43'}],
		[0,[5201, 12936],{id:'00282',mid:'44'}],
		[0,[4885, 12559],{id:'00283',mid:'45'}],
		[0,[5240, 12678],{id:'00284',mid:'46'}],
		[0,[5417, 12517],{id:'00285',mid:'47'}],
		[0,[5493, 12292],{id:'00286',mid:'48'}],
		[0,[5657, 12534],{id:'00287',mid:'49'}],
		[0,[5724, 12681],{id:'00288',mid:'50'}],
		[0,[5960, 12782],{id:'00289',mid:'51'}],
		[0,[5887, 12534],{id:'00290',mid:'52'}],

		[0,[6222, 12959],{id:'00291',mid:'53'}],
		[0,[6306, 13080],{id:'00292',mid:'54'}],
		[0,[6541, 13077],{id:'00293',mid:'55'}],
		[0,[6461, 12891],{id:'00294',mid:'56'}],
		[0,[6823, 13141],{id:'00295',mid:'57'}],
		[0,[6765, 12869],{id:'00296',mid:'58'}],
		[0,[7031, 13027],{id:'00297',mid:'59'}],
		[0,[7245, 12767],{id:'00298',mid:'60'}],
		[0,[7187, 12633],{id:'00299',mid:'61'}],
		[0,[6980, 12595],{id:'00300',mid:'62'}],
		[0,[6804, 12517],{id:'00301',mid:'63'}],
		[0,[6261, 12605],{id:'00302',mid:'64'}],
		[0,[5951, 12243],{id:'00303',mid:'65'}],
		[0,[6004, 12219],{id:'00304',mid:'66'}],
		[0,[6606, 12422],{id:'00305',mid:'67'}],
		[0,[6698, 12349],{id:'00306',mid:'68'}],
		[0,[6632, 12270],{id:'00307',mid:'69'}],
		[0,[6551, 12157],{id:'00308',mid:'70'}],
		[0,[7356, 12464],{id:'00309',mid:'71'}],
		[0,[7412, 12300],{id:'00310',mid:'72'}],
		[0,[7057, 12251],{id:'00311',mid:'73'}],
		[0,[7154,12232],{id:'00312',mid:'74'}],
		[0,[7100, 12163],{id:'00313',mid:'75'}],
		[0,[7510, 12081],{id:'00314',mid:'76'}],
		[0,[7410, 11952],{id:'00315',mid:'77'}],
		[0,[7271, 11879],{id:'00316',mid:'78'}],
		[0,[7064, 11861],{id:'00317',mid:'79'}],

];

// citymysteries

var listcitymysteriesreach = [

		[0,[0, 0],{id:'00162',mid:'01'}],
		
];

		
		
// RED KEEP






var listsignpostredkeep = [

		[0,[9779, 9169],{id:'00318',mid:'01'}],

];

var listcastleredkeep = [

		[0,[9929, 9202],{id:'00319',mid:'01'}],


];


var totalMarkers = 321;