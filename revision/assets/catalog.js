const DATA = window.GMA_CATALOG_DATA;
const DEPTS = window.GMA_CATALOG_DEPARTMENTS;
const CATALOG_VERSION = 24;
const LEGACY_ID_TO_REF_V21 = {"0-0":"6744","0-1":"6742","0-2":"6745","1-0":"6740","1-1":"6750","1-2":"6743","2-0":"3464","2-1":"6705","2-2":"701","2-3":"6747","3-0":"6787","3-1":"6144","3-2":"6140","3-3":"6154","4-0":"747","4-1":"5677","4-2":"513","4-3":"980","4-4":"623","4-5":"516","4-6":"461","4-7":"608","4-8":"3719","4-9":"1617","5-0":"1563","5-1":"6037","5-2":"2454","5-3":"2455","5-4":"2033","5-5":"4830","5-6":"2631","5-7":"1900","5-8":"1989","5-9":"1988","5-10":"6808","5-11":"993","5-12":"1997","5-13":"1996","5-14":"5265","6-0":"6719","6-1":"5217","6-2":"5917","6-3":"1014","6-4":"6041","6-5":"941","6-6":"6023","6-7":"5952","6-8":"3676","6-9":"5822","6-10":"1148","6-11":"3675","7-0":"700","7-1":"137","7-2":"1139","7-3":"6792","7-4":"132","7-5":"736","7-6":"5670","7-7":"5669","7-8":"708","8-0":"6390","8-1":"956","8-2":"2679","8-3":"1992","8-4":"3917","8-5":"2009","8-6":"2011","8-7":"2016","8-8":"6220","8-9":"6632","8-10":"5951","9-0":"486","9-1":"5955","9-2":"5151","9-3":"5400","9-4":"1595","9-5":"6752","9-6":"5149","9-7":"6714","10-0":"6335","10-1":"6336","10-2":"6334","10-3":"5165","10-4":"5947","10-5":"5961","11-0":"3881","11-1":"5627","11-2":"1060","11-3":"5938","11-4":"5625","11-5":"5152","12-0":"5609","12-1":"2158","12-2":"512","12-3":"5250","12-4":"6754","12-5":"4150","12-6":"6715","13-0":"5944","13-1":"5957","13-2":"6395","13-3":"261","13-4":"260","13-5":"4010","13-6":"5062","13-7":"4704","13-8":"5309","13-9":"4117","13-10":"4705","13-11":"5215","13-12":"262","13-13":"5175","13-14":"5554","13-15":"5553","13-16":"6240","13-17":"6375","13-18":"6030","13-19":"6031","14-0":"2323","14-1":"1458","14-2":"5047","14-3":"947","14-4":"166","14-5":"062","14-6":"5823","14-7":"649","14-8":"020","14-9":"049","14-10":"1501","14-11":"064","14-12":"065","14-13":"6691","14-14":"6583","14-15":"053","14-16":"2530","14-17":"285","14-18":"6739","14-19":"2375","14-20":"2901","14-21":"6703","14-22":"6061","14-23":"6163","14-24":"98","14-25":"4787","14-26":"003","14-27":"214","15-0":"6417","15-1":"2303","15-2":"4545","15-3":"1576","15-4":"1324","15-5":"3144","15-6":"1320","15-7":"1260","15-8":"6142","15-9":"6133","15-10":"3862","15-11":"933","15-12":"1009","15-13":"3786","15-14":"3787","15-15":"1173","15-16":"6734","15-17":"1579","15-18":"6094","16-0":"5311","16-1":"5148","16-2":"5146","16-3":"5153","16-4":"5154","16-5":"5242","16-6":"6036","16-7":"754","16-8":"5775","16-9":"5998","16-10":"017","17-0":"6488","17-1":"6486","17-2":"5972","17-3":"5971","17-4":"6042","17-5":"5970","17-6":"802","17-7":"803","17-8":"6736","17-9":"2898","17-10":"6727","17-11":"6717","17-12":"6012","17-13":"6735","17-14":"1770","17-15":"6221","17-16":"6113","17-17":"5327","17-18":"5491","17-19":"121","17-20":"1902","17-21":"3654","17-22":"3406","17-23":"6112","17-24":"5329","17-25":"425","17-26":"6809","17-27":"6355","17-28":"6481","17-29":"5328","18-0":"6687","18-1":"6153","18-2":"6770","18-3":"5351","18-4":"5168","18-5":"5602","18-6":"5352","18-7":"5068","19-0":"5525","19-1":"5721","19-2":"6751","19-3":"6120","19-4":"5524","19-5":"6804","19-6":"6029","19-7":"4083","19-8":"5480","20-0":"5350","20-1":"3510","20-2":"3780","20-3":"5349","20-4":"5380","20-5":"5604","20-6":"4362","20-7":"5332","20-8":"5379","20-9":"808","20-10":"6716","20-11":"4861","20-12":"6455","20-13":"6768","20-14":"6535","20-15":"5378","20-16":"5331","20-17":"3776","20-18":"6114","20-19":"6805","20-20":"6810","21-0":"417","21-1":"389","21-2":"3919","21-3":"6721","21-4":"45","21-5":"709","21-6":"720","21-7":"136","21-8":"6040","21-9":"6155","21-10":"6633","21-11":"026","21-12":"4343","21-13":"1006","21-14":"019","22-0":"989900","22-1":"4476","22-2":"5372","22-3":"5330","22-4":"6394","22-5":"5978","22-6":"6791","22-7":"4727","22-8":"3771","22-9":"5340","22-10":"5348","22-11":"5345","22-12":"6484","23-0":"6790","23-1":"1966","23-2":"6107","23-3":"2522","23-4":"6071","23-5":"5122","23-6":"5177","23-7":"5178","23-8":"2493","23-9":"2494","23-10":"6693","23-11":"6709","23-12":"6069","23-13":"4964","23-14":"1976","23-15":"1977","23-16":"5335","23-17":"6704","23-18":"6692","23-19":"6694","23-20":"6695","23-21":"6017","23-22":"6795","24-0":"797","24-1":"5334","24-2":"5605","24-3":"6789","24-4":"1550","24-5":"806","24-6":"3781","24-7":"6737","24-8":"1806","24-9":"5338","24-10":"5376","24-11":"796","24-12":"5333","24-13":"5377","24-14":"6738","24-15":"1808","24-16":"807","24-17":"3782","24-18":"5375","24-19":"5339","24-20":"5606","25-0":"6124","25-1":"6710","25-2":"5618","25-3":"6671","25-4":"5654","25-5":"5642","25-6":"6588","25-7":"6116","25-8":"6669","25-9":"6115","25-10":"6670","25-11":"6673","25-12":"6134","25-13":"6672","25-14":"6117","25-15":"5652","25-16":"6587","25-17":"6118","26-0":"429","26-1":"490","26-2":"426","26-3":"75","26-4":"433","26-5":"419","26-6":"421","26-7":"434","26-8":"403","26-9":"404","26-10":"435","26-11":"1837","26-12":"1601","26-13":"1838","26-14":"47024","26-15":"3219","26-16":"229160","26-17":"1406","26-18":"1273","26-19":"1409","26-20":"1408","26-21":"1407","27-0":"2297","27-1":"2406","27-2":"5107","27-3":"1620","27-4":"1915","27-5":"868","27-6":"4720","27-7":"5450","28-0":"5819","28-1":"5824","28-2":"5925","28-3":"5860","28-4":"6446","28-5":"6143","28-6":"5859","29-0":"5284","29-1":"1116","29-2":"5283","29-3":"5292","29-4":"5459","29-5":"8001","29-6":"6801","29-7":"5950","29-8":"5285","29-9":"6800","29-10":"6799","29-11":"5858","29-12":"6601","29-13":"1587","29-14":"357","29-15":"478","29-16":"6811","29-17":"6812","29-18":"8000","30-0":"3396","30-1":"3397","30-2":"5475","30-3":"5238","30-4":"5570","30-5":"4345","30-6":"6086","31-0":"6712","31-1":"5534","31-2":"5494","31-3":"5571","31-4":"5476","31-5":"5918","31-6":"5557","31-7":"5337","31-8":"6711","31-9":"4692","31-10":"5336","31-11":"5374","31-12":"2463","31-13":"5466","31-14":"5493","31-15":"6729","31-16":"5698","31-17":"5365","31-18":"5538","31-19":"5364","31-20":"5594","31-21":"6730","31-22":"4344","31-23":"5326","31-24":"5363","31-25":"5597","31-26":"6732","31-27":"4699","32-0":"6162","32-1":"04000","32-2":"00048","32-3":"02259","32-4":"02342","32-5":"00191","32-6":"00258","32-7":"02442","32-8":"04139","32-9":"02709","32-10":"02711","32-11":"00072","32-12":"03946","32-13":"01274","32-14":"02496","32-15":"01164","32-16":"01154","32-17":"01719","32-18":"01163","32-19":"03089","32-20":"03329","32-21":"02910","32-22":"01755","32-23":"00568","32-24":"03330","32-25":"02535","32-26":"01382","32-27":"01266","32-28":"04033","33-0":"2151","33-1":"6713","33-2":"6631","33-3":"5953","33-4":"6636","34-0":"5968","34-1":"5967","34-2":"3895","35-0":"5999","35-1":"6004","35-2":"5996","35-3":"5987","35-4":"6698","35-5":"6699","35-6":"6697","36-0":"4599","36-1":"5966","36-2":"5986","36-3":"5995","36-4":"5969","36-5":"5985","36-6":"5768","37-0":"6779","37-1":"6778","37-2":"6780","37-3":"4593","37-4":"5907","37-5":"6708","37-6":"3147","37-7":"3148","37-8":"5171","37-9":"4831","37-10":"5278","37-11":"4807","37-12":"4592","37-13":"6807","37-14":"4832","37-15":"4591","38-0":"5776","38-1":"6033","38-2":"1127","38-3":"5782","38-4":"5783","38-5":"6619","38-6":"6777","38-7":"5847","38-8":"5778","38-9":"5848","38-10":"5781","38-11":"6058","38-12":"1393","38-13":"5959","38-14":"4385","38-15":"6641","38-16":"1193","38-17":"6629","38-18":"6645","38-19":"6635","38-20":"6643","38-21":"5746","38-22":"5785","38-23":"3497","38-24":"5769","38-25":"5779","38-26":"5745","38-27":"5777","38-28":"5773","38-29":"5780","38-30":"5771","38-31":"6034","38-32":"5797","38-33":"6640","39-0":"5811","39-1":"5812","39-2":"5772","40-0":"6700","40-1":"5162","41-0":"3962","41-1":"3961","41-2":"3912","41-3":"3911","41-4":"4103","41-5":"3928","41-6":"5124","41-7":"3942","41-8":"3989","41-9":"3990","41-10":"5112","41-11":"3817","41-12":"3841","42-0":"4126","42-1":"6773","42-2":"6775","42-3":"6753","42-4":"1517","42-5":"1516","42-6":"4129","42-7":"2119","42-8":"1627","42-9":"1623","43-0":"3856","43-1":"2423","43-2":"2483","43-3":"2422","43-4":"5103","43-5":"3149","43-6":"6772","44-0":"8002","44-1":"8003","44-2":"8004","44-3":"8005","44-4":"8006","44-5":"8007","44-6":"8008","44-7":"8009","44-8":"8010","45-0":"6131","45-1":"6793","45-2":"4340","45-3":"5237","45-4":"6132","45-5":"6794","46-0":"4409","46-1":"2452","46-2":"5827","47-0":"1430","47-1":"853","47-2":"3997","47-3":"5770","47-4":"1307","47-5":"1309","47-6":"1310","47-7":"6774","47-8":"6766","47-9":"6767","47-10":"6548","47-11":"3927","47-12":"3906","48-0":"6590","48-1":"5298","48-2":"3195","48-3":"6682","48-4":"5474","48-5":"4875","48-6":"6161","48-7":"3400","48-8":"5223","48-9":"3367","48-10":"4846","48-11":"4677","48-12":"5128","48-13":"5799","48-14":"6718","48-15":"5838","48-16":"1530","48-17":"1136","48-18":"6159","48-19":"5482","48-20":"5734","48-21":"5211","48-22":"4511","48-23":"4495","48-24":"6160","48-25":"4512","48-26":"4496","48-27":"6128","48-28":"6591","48-29":"5926","48-30":"2409","48-31":"2752","48-32":"2753","48-33":"2410","48-34":"3379","48-35":"5699","48-36":"4908","48-37":"4909","48-38":"3","48-39":"5839","48-40":"083","48-41":"5850","48-42":"6052","48-43":"3268","48-44":"2798","48-45":"3211","48-46":"3210","48-47":"6020","48-48":"5871","48-49":"3375","48-50":"3378","48-51":"5849","48-52":"4810","48-53":"6297","49-0":"6158","49-1":"3187","49-2":"3263","49-3":"5915","49-4":"6072","49-5":"4205","49-6":"5927","49-7":"6725","49-8":"6781","49-9":"4866","49-10":"6065","49-11":"6129","49-12":"6782","49-13":"5","49-14":"3184","49-15":"5910","49-16":"5929","49-17":"6093","49-18":"5914","49-19":"4450","49-20":"2111","49-21":"3165","49-22":"6534","49-23":"440","49-24":"54","49-25":"3189","49-26":"5949","49-27":"5249","49-28":"3377","49-29":"1410","49-30":"3747","50-0":"2785","50-1":"4","50-2":"452","50-3":"6748","50-4":"5920","50-5":"4993","50-6":"5268","50-7":"2801","50-8":"3177","50-9":"2799","50-10":"5269","50-11":"4098","51-0":"5443","51-1":"2904","51-2":"4134","51-3":"5373","51-4":"4363","51-5":"6628","51-6":"6152","51-7":"4135","51-8":"6219","51-9":"5851","51-10":"6723","51-11":"6724","51-12":"5483","51-13":"457","51-14":"1479","51-15":"6608","51-16":"1570","51-17":"6726","52-0":"193","52-1":"6624","52-2":"255","52-3":"5132","52-4":"3434","52-5":"2985","52-6":"2986","52-7":"6148","52-8":"6026","52-9":"250","53-0":"4990","53-1":"1333","53-2":"PRU005","53-3":"6066","53-4":"100591","53-5":"12161","53-6":"BOL73602","53-7":"68058","53-8":"85058","53-9":"81058","53-10":"20714","53-11":"29029","53-12":"77029","53-13":"12029","53-14":"3843","54-0":"9458","54-1":"SOU001","54-2":"140308","54-3":"9412","54-4":"13198","54-5":"113150","54-6":"48079","54-7":"48027","54-8":"8297","54-9":"151825","54-10":"9372","54-11":"20799","54-12":"971","54-13":"9072","54-14":"41011","54-15":"130160","54-16":"130161","54-17":"10041","54-18":"473160","54-19":"89011","54-20":"28038","54-21":"127160","54-22":"43011","54-23":"44011","54-24":"44057","54-25":"42057","54-26":"29027","54-27":"77027","55-0":"6007","55-1":"5912","55-2":"5911","55-3":"3201","55-4":"6141","55-5":"5639","55-6":"5325","55-7":"5641","55-8":"5749","55-9":"6050","55-10":"6474","55-11":"5496","55-12":"5497","56-0":"6593","56-1":"6654","56-2":"6630","56-3":"99995","56-4":"6392","56-5":"6549","56-6":"6223","56-7":"6224","56-8":"6228","56-9":"6135","56-10":"6136","56-11":"6137","56-12":"99998","57-0":"6610","57-1":"6616","57-2":"6786","57-3":"6615","57-4":"6612","57-5":"6611","57-6":"6614","57-7":"6613","57-8":"6667","57-9":"6684","57-10":"3325","57-11":"2762","57-12":"313","57-13":"059","57-14":"3079","57-15":"3013","57-16":"2984","57-17":"5511","58-0":"2374","58-1":"2135","58-2":"6761","58-3":"00353","58-4":"689","58-5":"00355","58-6":"442","59-0":"146","59-1":"6607","60-0":"2369","60-1":"735","60-2":"76","60-3":"411","60-4":"416","60-5":"400","60-6":"115","60-7":"460","60-8":"3858","60-9":"96","60-10":"64","60-11":"62","60-12":"414","60-13":"126","60-14":"119","60-15":"412","60-16":"130","60-17":"5301","60-18":"124","60-19":"405","61-0":"2167","61-1":"2168","61-2":"3944","61-3":"6686","61-4":"5509","61-5":"3876","61-6":"3821","61-7":"6765","61-8":"6763","61-9":"6764","61-10":"3842","61-11":"6757","61-12":"2177","61-13":"2175","61-14":"2171","61-15":"2172","61-16":"6720","61-17":"388","61-18":"1431","61-19":"6758","61-20":"3366","61-21":"3451","61-22":"3436","61-23":"3657","61-24":"5596","61-25":"5581","61-26":"5580","61-27":"6755","61-28":"2184","61-29":"4411","61-30":"6125","61-31":"4412","61-32":"367","61-33":"1605","61-34":"3885","61-35":"3811","61-36":"6104","61-37":"4404","61-38":"3176","61-39":"363","61-40":"5718","61-41":"3312","61-42":"2169","61-43":"962","61-44":"967","61-45":"1347","61-46":"25","61-47":"986","61-48":"995","61-49":"2152","61-50":"610","61-51":"199","61-52":"604","62-0":"2180","62-1":"2178","62-2":"957","62-3":"2204","62-4":"2205","62-5":"959","62-6":"2203","62-7":"2218","62-8":"4414","62-9":"6760","63-0":"536","63-1":"534","63-2":"392","63-3":"6256","63-4":"6364","63-5":"6180","63-6":"6620","63-7":"6327","64-0":"2665","64-1":"5722","65-0":"448","65-1":"415","65-2":"602","66-0":"905","67-0":"1998","67-1":"1999","68-0":"1991","68-1":"1993","68-2":"6018","68-3":"6665","69-0":"1995","69-1":"1994","69-2":"2456","70-0":"5747","70-1":"6169","70-2":"5788","70-3":"3302","70-4":"6646","70-5":"6105","70-6":"5796","70-7":"5790","71-0":"5900","71-1":"5896","71-2":"5899","71-3":"5892","71-4":"5894","71-5":"5897","71-6":"5901","71-7":"5902","71-8":"6609","71-9":"5866","71-10":"6121","71-11":"6595","71-12":"5891","71-13":"5893","71-14":"5890","71-15":"5870","71-16":"5869","71-17":"5867","71-18":"5888","71-19":"6122","71-20":"5868","71-21":"5889","72-0":"6418","72-1":"6091","72-2":"6785","72-3":"5878","72-4":"6081","72-5":"6333","72-6":"5883","72-7":"5941","72-8":"6596","72-9":"5885","72-10":"5863","72-11":"5864","72-12":"5875","72-13":"5861","73-0":"6123","73-1":"6483","73-2":"6482","73-3":"5874","73-4":"5877","73-5":"5879","73-6":"5876","74-0":"5903","74-1":"5919","74-2":"5940","74-3":"5928","74-4":"5904","74-5":"5989","74-6":"6156","75-0":"5862","75-1":"5884","75-2":"5965","75-3":"5882","75-4":"5881","76-0":"6075","76-1":"5887","76-2":"6057","76-3":"5865"};
// El identificador interno cambia al reorganizar familias; reconstruimos el mapa por referencia.
const REF_TO_ID_V22 = Object.fromEntries(DATA.flatMap((group,gi)=>group.items.map((item,ii)=>[String(item.ref),`${gi}-${ii}`])));
const MODO_LABEL = {C:'ud', K:'kg', U:'ud'};
const DEPT_ICONS={
"Aperitivos":'<svg viewBox="0 0 24 24" fill="none"><line x1="4" y1="20" x2="19" y2="5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="13" cy="11" r="4.3" stroke="currentColor" stroke-width="1.6"/><circle cx="13" cy="11" r="1.1" fill="currentColor"/></svg>',
"Conservas de las Huertas":'<svg viewBox="0 0 24 24" fill="none"><rect x="6" y="8.5" width="12" height="11.5" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M9.5 8.5V6.3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V8.5" stroke="currentColor" stroke-width="1.6"/><line x1="6" y1="13.5" x2="18" y2="13.5" stroke="currentColor" stroke-width="1.6"/></svg>',
"Despensa":'<svg viewBox="0 0 24 24" fill="none"><path d="M10.2 3h3.6v2.7l1.6 2.2v11.6a1.5 1.5 0 0 1-1.5 1.5h-3.8A1.5 1.5 0 0 1 8.6 19.5V7.9l1.6-2.2V3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><line x1="8.6" y1="12.5" x2="15.4" y2="12.5" stroke="currentColor" stroke-width="1.6"/></svg>',
"Harinas y Panadería":'<svg viewBox="0 0 24 24" fill="none"><line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 6.5l-3 2M12 6.5l3 2M12 10.5l-3 2M12 10.5l3 2M12 14.5l-3 2M12 14.5l3 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
"Pasta Italiana":'<svg viewBox="0 0 24 24" fill="none"><path d="M5 17.5c0-6.5 4.2-11.5 9-11.5 3.6 0 6.2 2.6 6.2 5.7S17.8 17.5 15.2 17.5s-3.2-1.9-3.2-3.6 1.6-3 3-3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
"Quesos y Lácteos":'<svg viewBox="0 0 24 24" fill="none"><path d="M3 17.2 12 6l9 11.2a1 1 0 0 1-.8 1.6H3.8a1 1 0 0 1-.8-1.6z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="14" r="1" fill="currentColor"/><circle cx="15.3" cy="15.6" r=".8" fill="currentColor"/></svg>',
"Jamones y Paletas":'<svg viewBox="0 0 24 24" fill="none"><path d="M12 4.2c-3.1 0-5.3 2.7-5.3 6.4 0 4.6 2.8 9.4 5.3 9.4s5.3-4.8 5.3-9.4c0-3.7-2.2-6.4-5.3-6.4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 4.2V2.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
"Embutidos":'<svg viewBox="0 0 24 24" fill="none"><path d="M6 6c3-2 9 0 11 4s2 7-1 9-8 0-11-4S3 8 6 6ZM6 6 4 4m13 6 3-1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
"Carnes y Encargos":'<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="6.5" width="16" height="11" rx="4" stroke="currentColor" stroke-width="1.6"/><line x1="8" y1="8.5" x2="6.3" y2="15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="13" y1="8.5" x2="11.3" y2="15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="18" y1="8.5" x2="16.3" y2="15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
"Patés y Foie":'<svg viewBox="0 0 24 24" fill="none"><rect x="4.5" y="13" width="15" height="6" rx="1.6" stroke="currentColor" stroke-width="1.6"/><path d="M5.5 13c.9-4.2 3.6-7.3 6.5-7.3s5.6 3.1 6.5 7.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
"Pescados y Salazones":'<svg viewBox="0 0 24 24" fill="none"><path d="M3 12c3-4.2 8-6.3 12-6.3 3.1 0 5.8 2.6 5.8 6.3s-2.7 6.3-5.8 6.3c-4 0-9-2.1-12-6.3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M15 9.2v5.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="7.3" cy="11" r=".9" fill="currentColor"/></svg>',
"Gama del Chef":'<svg viewBox="0 0 24 24" fill="none"><path d="M7 11.3a4 4 0 0 1 .8-7.9A3.4 3.4 0 0 1 12 2.2a3.4 3.4 0 0 1 4.2 1.2 4 4 0 0 1 .8 7.9v2.7H7v-2.7z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><rect x="7" y="14.8" width="10" height="5.2" rx="1" stroke="currentColor" stroke-width="1.6"/></svg>',
"Preparados de Cocina":'<svg viewBox="0 0 24 24" fill="none"><rect x="8" y="7.5" width="8" height="12.5" rx="2" stroke="currentColor" stroke-width="1.6"/><rect x="9.4" y="3.2" width="5.2" height="4.3" rx="1" stroke="currentColor" stroke-width="1.6"/><circle cx="10.6" cy="11.5" r=".7" fill="currentColor"/><circle cx="13.4" cy="11.5" r=".7" fill="currentColor"/><circle cx="12" cy="14" r=".7" fill="currentColor"/></svg>',
"Repostería":'<svg viewBox="0 0 24 24" fill="none"><path d="M6.3 12.2h11.4l-1.4 6.6a1 1 0 0 1-1 .8H8.7a1 1 0 0 1-1-.8l-1.4-6.6z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7.2 12.2c-.9-2.9 1-5.1 4.8-5.1s5.7 2.2 4.8 5.1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="4.7" r="1" fill="currentColor"/></svg>',
"Vinos y Bebidas":'<svg viewBox="0 0 24 24" fill="none"><path d="M8 3.5h8l-1 6.2a3 3 0 0 1-6 0L8 3.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><line x1="12" y1="12.5" x2="12" y2="18" stroke="currentColor" stroke-width="1.6"/><line x1="8.8" y1="20" x2="15.2" y2="20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
"Navidad":'<svg viewBox="0 0 24 24" fill="none"><path d="M12 3.2l3.4 5.3h-2.1l3 4.6h-2.4l2.6 4.4H8.5l2.6-4.4H8.7l3-4.6H9.6L12 3.2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="12" y1="17.5" x2="12" y2="20.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
"Menaje y Servicios":'<svg viewBox="0 0 24 24" fill="none"><path d="M7.3 3.2v6.8a1.5 1.5 0 0 0 3 0V3.2M8.8 3.2v4.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="8.8" y1="10" x2="8.8" y2="20.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M16 3.2c-1.4 0-2.3 1.6-2.3 4s.9 4 2.3 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="16" y1="11.2" x2="16" y2="20.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
};

const DEPT_COLOR = {};
DATA.forEach(g => { DEPT_COLOR[g.dept] = g.color; });

// Navigation illustrations for the catalog subfamilies. The original colour swatch
// stays in place; these symbols inherit the family colour and are not product photos.
const SUBFAMILY_ICONS = {
  'Frutos Secos':'<path d="M12 4C8 2 4.5 5.5 5.5 9.5c-2 2.5-.6 5.5 1.6 6.4-.3 3.6 2.8 5.6 4.9 4.1 2.1 1.5 5.2-.5 4.9-4.1 2.2-.9 3.6-3.9 1.6-6.4C19.5 5.5 16 2 12 4Z"/><path d="M12 5v14M8.8 7.8l3.2 2.7-2 2.1 2 2.2m3.2-7-3.2 2.7 2 2.1-2 2.2"/>',
  'Patatas':'<path d="M4 12c-.2-3.2 1.6-5.4 4.4-5.8 1.3-2.4 4.4-3.5 7-2.1 2.2.1 3.7 1.7 3.7 4 .9 1.4 1.1 3.3.2 4.5-.1 3.2-2.5 5.8-5.9 6.2-1.8 1.2-4.1.8-5.4-.6C5.6 18.1 4.1 15.4 4 12Z"/><circle cx="9" cy="9.4" r=".65" fill="currentColor" stroke="none"/><circle cx="15.2" cy="8.5" r=".65" fill="currentColor" stroke="none"/><circle cx="11.9" cy="15.8" r=".65" fill="currentColor" stroke="none"/>',
  'Aceitunas':'<path d="M12 9V4m0 3c2-2 4-3 7-3M12 6c-2-2-4-2-6-1"/><ellipse cx="8" cy="14.4" rx="3.6" ry="5.3" transform="rotate(-17 8 14.4)"/><ellipse cx="16.1" cy="14.4" rx="3.6" ry="5.3" transform="rotate(17 16.1 14.4)"/><circle cx="8" cy="13.4" r=".7" fill="currentColor" stroke="none"/><circle cx="16.1" cy="13.4" r=".7" fill="currentColor" stroke="none"/>',
  'Gildas':'<path d="M3 20 20 3M18.5 2.5l3 3"/><circle cx="8.2" cy="14.7" r="2.4"/><path d="M10.5 13c1.7-2.7 4.4-3.1 5.3-1.5.8 1.5-.7 3.8-2.7 4.2M14.8 8.2c1.8-.9 3.5 0 4 1.5"/><circle cx="16.9" cy="7.4" r="2.1"/>',
  'Tomate Nacional':'<path d="M5 13c0-3.7 3-6.4 7-6.4s7 2.7 7 6.4c0 4.1-3.1 7.2-7 7.2S5 17.1 5 13Z"/><path d="m12 7-2.1-2.3L12 5l2.1-.3L12 7ZM12 5V3M7 8.6l5-1.6 5 1.6"/>',
  'Pasta Seca':'<path d="m3 6 3-2 5 10-3 2L3 6Zm7-2 3-2 6 11-3 2-6-11ZM6 17l3-2 3 5-3 2-3-5Z"/><path d="m3 6 3 1m4-3 3 1m3 10 3-2"/>',
  'Quesos de Cabra':'<path d="M4 9c0-2.5 3.5-4.5 8-4.5s8 2 8 4.5v7c0 2.5-3.5 4.5-8 4.5s-8-2-8-4.5V9Z"/><path d="M4 9c0 2.5 3.5 4.5 8 4.5s8-2 8-4.5M8 17h8M10 8h4"/>',
  'Jamones':'<path d="M6 19c-3-3-3-8 1-12 3-3 7-3 10 0 3 3 2 7-1 10-4 4-8 5-10 2ZM17 7l2-3m0 0 3 1M8 15c0-3 2-5 4-6"/>',
  'Jamones Italianos':'<path d="M6 19c-3-3-3-8 1-12 3-3 7-3 10 0 3 3 2 7-1 10-4 4-8 5-10 2ZM17 7l2-3m0 0 3 1M8 15c0-3 2-5 4-6"/>',
  'Salmón Ahumado':'<path d="M3 12c4-5 10-7 16-3l2 3-2 3C13 19 7 17 3 12Z"/><path d="M7 9v6M11 8v8M15 9v6"/><circle cx="18" cy="12" r=".5"/>',
  'Vinos Tintos':'<path d="M6 3h12l-1 7a5 5 0 0 1-10 0L6 3ZM12 15v5M8 21h8"/><path d="M7 9c3 1 7 1 10 0"/>',
  'Conservas Italianas':'<path d="M5 6h14M7 6V4h10v2M6 6v14h12V6M6 10h12"/><circle cx="12" cy="15" r="3"/><path d="m12 12-1-1 1 .3 1-.3-1 1M9 20h6"/>',
  'Verduras Selectas':'<path d="M8 8c-2.4 3.5-3.6 7.6-2 12.4 4.3-2 7.6-5.5 9.1-10.7L8 8Z"/><path d="M8 8C6 5 6.4 3.5 7 3c2 1 2.7 2.7 2.9 4.6M10 7.5C11.1 4.4 12.7 3 14.5 3c.3 2.3-.6 3.8-2.2 5M7 20.4c4-4 6.6-7.5 8.9-11.4"/>',
  'Tomate Italiano':'<path d="M12 3v4M12 6C8 5 5 7 4 10m8-4c4-1 7 1 8 4"/><path d="M3.8 14.5c0-3.5 2.4-5.4 5.3-5.4s5.3 1.9 5.3 5.4-2.1 5.9-5.3 5.9-5.3-2.4-5.3-5.9ZM14 14.5c0-3.5 2.4-5.4 5.3-5.4 2 0 3.1 2.3 3.1 5.4s-1.1 5.9-3.1 5.9c-3.2 0-5.3-2.4-5.3-5.9Z"/><path d="m9.1 9.1-2.2-2 2.2.7 2.2-.7-2.2 2m10.2 0-2.2-2 2.2.7 2.2-.7-2.2 2"/>',
  'Verduras y Frutas en Conserva':'<path d="M5 6h14M7 6V4h10v2M6 6v14h12V6M6 10h12"/><circle cx="10" cy="15.3" r="2.3"/><path d="M10 13c.4-1.3 1.3-1.8 2.5-1.7M15.6 12.5l-2.2 5h4.2l-2-5ZM15.6 12.5l1-1"/>',
  'Quesos Cremosos y Frescos':'<path d="M3 10h14l-2 10H5L3 10ZM3 10c0-2 3-3 7-3s7 1 7 3-3 3-7 3-7-1-7-3Z"/><path d="M7 9c1-1.4 4-1.4 5 0M18 4l-4 11M18 4c1-2 3-1 3 0 0 2-2 3-3 0Z"/>',
  'Quesos del Mundo':'<path d="M3 17 11 7l9 10-9 3-8-3ZM3 17h17"/><circle cx="10" cy="15" r="1"/><circle cx="17.5" cy="6" r="3"/><path d="M14.5 6h6M17.5 3c-1 1-1 5 0 6 1-1 1-5 0-6"/>',
  'Quesos Rallados y Loncheados':'<path d="M4 8h13l3 3v8H4V8ZM7 12h10M7 15h10M7 18h10M17 8v3h3"/><path d="m7 5 2-2m3 2 2-2m3 2 2-2"/>',
  'Quesos Nacionales':'<path d="M3 17 12 5l9 12-9 3-9-3ZM3 17h18"/><circle cx="11" cy="15" r="1.1"/><circle cx="16" cy="16" r=".8"/><path d="m12 5-3 6"/>',
  'Quesos Italianos':'<path d="M4 16 17 5l3 13H4v-2ZM4 16h16M17 5v11"/><circle cx="12" cy="13" r="1" fill="currentColor" stroke="none"/><circle cx="17" cy="17" r=".7" fill="currentColor" stroke="none"/>',
  'Nata y Mantequilla':'<path d="M4 12h11l2 8H6l-2-8ZM5 12l2-3h8l-1 3M18 8c0-2 2-3 3-1 1 2-1 4-3 5"/><path d="M8 15h5M9 17h4"/>',
  'Quesos (Encargo)':'<path d="M3 11 12 5l9 6-9 6-9-6ZM3 11v8l9 3 9-3v-8M12 17v5"/><path d="m9 10 3-2 3 2m-6 3 3 2 3-2"/>',
  'Paletas':'<path d="M6 18c-3-2-2-6 0-9 2-4 6-6 10-4 4 2 4 6 2 10-2 4-7 6-12 3ZM17 7l2-3 3 1M7 15c0-2 1-4 3-5"/>',
  'Sobres, Picadillos y Loncheados':'<path d="M4 4h16v16H4V4ZM4 8h16M7 12c3-2 7-2 10 0M7 15c3-2 7-2 10 0M7 18h10"/>',
  'Lomos':'<path d="M3 11c2-4 6-6 11-5 4 1 7 4 7 7s-3 6-7 6c-5 0-9-3-11-8Z"/><path d="M6 10c2 1 4 3 5 6m1-8c2 1 4 3 5 7"/>',
  'Embutidos Italianos':'<path d="M6 6c3-2 9 0 11 4s2 7-1 9-8 0-11-4S3 8 6 6ZM6 6 4 4m13 6 3-1"/><path d="M7 10c2-1 5 0 6 3s1 5-1 5M10 9h.01M15 14h.01"/>',
  'Centros Deshuesados':'<path d="M4 12c0-5 3-8 8-8s8 3 8 8-3 8-8 8-8-3-8-8Z"/><path d="M7 12c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5ZM9 12h6"/>',
  'Embutidos Nacionales':'<path d="M4 4h16M9 4v3M16 4v3M7 7c-2 2-2 9 0 11 1 2 3 2 4 0 2-2 2-9 0-11-1-1-3-1-4 0ZM14 7c-2 2-2 9 0 11 1 2 3 2 4 0 2-2 2-9 0-11-1-1-3-1-4 0Z"/>',
  'Chorizo y Salchichón':'<path d="M4 8c1-2 4-3 6-2 2 1 3 4 3 7 0 4-2 7-5 7s-5-3-5-7c0-2 0-4 1-5ZM13 8c1-2 4-3 6-2 2 1 3 4 3 7 0 4-2 7-5 7-2 0-4-2-4-5"/><path d="m7 6-1-3m11 3 1-3M7 11h.01M17 11h.01"/>',
  'Estuches y Packs Ibéricos (Encargo)':'<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M3 12h18M12 8v13M8 8V5c0-3 4-2 4 3 0-5 4-6 4-3v3"/>',
  'Formatos de Jamón y Paleta (Encargo)':'<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M3 12h18M12 8v13M8 8V5c0-3 4-2 4 3 0-5 4-6 4-3v3"/>',
  'Patés':'<path d="M5 14h14v6H5v-6ZM6 14c0-4 3-8 6-8s6 4 6 8M9 9h6"/><path d="M3 20h18"/>',
  'Pato y Oca':'<path d="M4 16c0-3 2-5 5-5l3 1V7c0-2 1-3 3-3 2 0 3 1 3 3l3 1-3 2v3c2 2 1 5-2 6H8c-3 0-4-1-4-3Z"/><circle cx="16" cy="6.5" r=".5" fill="currentColor" stroke="none"/><path d="M8 19v2m6-2v2M5 15l-2-2"/>',
  'Casquería':'<path d="M4 9c2-4 6-5 9-3 3-2 7 0 7 4 0 5-4 9-9 9-4 0-8-4-7-10Z"/><path d="M8 8c1 3 3 4 5 4s4-1 5-3M12 12v5"/>',
  'Cárnicos Cocidos y Ahumados':'<path d="M4 14c1-4 4-6 8-6s7 2 8 6c0 4-3 6-8 6s-8-2-8-6ZM4 16h16M9 6c-2-2 2-3 0-5M15 6c-2-2 2-3 0-5"/>',
  'Carne de Cerdo Ibérico y Duroc':'<path d="M4 9c2-4 11-5 15 0 2 3 1 8-3 10H7c-4-2-5-7-3-10Z"/><path d="M7 7 6 4m10 2 2-2M7 14c2-2 8-2 10 0"/><circle cx="9" cy="11" r=".5"/>',
  'Carnes Ibéricas por Encargo':'<path d="M3 16h18v4H3v-4ZM5 16c0-6 3-10 7-10s7 4 7 10M8 10c2-1 6-1 8 0M10 13h4"/><path d="M10 4h4m-2 0v2"/>',
  'Ternera por Encargo':'<path d="M5 9 3 5l5 2c2-2 6-2 8 0l5-2-2 4v6c0 3-3 5-7 5s-7-2-7-5V9ZM8 14c2 1 6 1 8 0"/><circle cx="9" cy="11" r=".6" fill="currentColor" stroke="none"/><circle cx="15" cy="11" r=".6" fill="currentColor" stroke="none"/>',
  'Atun':'<path d="M3 12c4-5 10-6 15-3l3-2-1 5 1 5-3-2c-5 3-11 2-15-3Z"/><path d="M8 9v6m4-7v8M15 9v6"/><circle cx="17" cy="12" r=".5"/>',
  'Pulpo':'<path d="M8 11a4 4 0 0 1 8 0v3H8v-3ZM9 14c-3 4-6 2-5 0m7 0c-2 5-3 6-5 5m7-5c0 5 1 6 3 5m-1-5c3 4 6 2 5 0"/><circle cx="10" cy="11" r=".5"/><circle cx="14" cy="11" r=".5"/>',
  'Conservas del Mar':'<rect x="4" y="6" width="16" height="14" rx="3"/><path d="M4 10h16M6 15c4-4 8-4 12 0-4 4-8 4-12 0Z"/><circle cx="15" cy="15" r=".5"/>',
  'Anchoa y Boquerones':'<path d="M3 9c4-3 8-3 12 0l5-2-1 3 1 3-5-2c-4 3-8 3-12-2ZM3 16c4-3 8-3 12 0l5-2-1 3 1 3-5-2c-4 3-8 3-12-2Z"/><circle cx="6" cy="9" r=".5" fill="currentColor" stroke="none"/><circle cx="6" cy="16" r=".5" fill="currentColor" stroke="none"/>',
  'Salazones':'<path d="M4 13c4-5 10-5 16 0-6 5-12 5-16 0Z"/><path d="M7 9h10M7 19h10M12 10v6M9 12h.01m6 2h.01"/>',
  'Complementos y Otros Ahumados':'<path d="M4 14c4-4 8-4 12 0l4-2v4l-4-2c-4 4-8 4-12 0Z"/><path d="M8 8c-2-2 2-2 0-4M13 8c-2-2 2-2 0-4M18 8c-2-2 2-2 0-4"/>',
  'Sardinas':'<path d="M3 8c4-3 8-3 12 0l5-2-1 3 1 3-5-2c-4 3-8 3-12-2ZM3 16c4-3 8-3 12 0l5-2-1 3 1 3-5-2c-4 3-8 3-12-2Z"/><circle cx="6" cy="8" r=".5" fill="currentColor" stroke="none"/><circle cx="6" cy="16" r=".5" fill="currentColor" stroke="none"/>',
  'Congelados':'<path d="M12 2v20M3 7l18 10M3 17 21 7M9 4l3 3 3-3M9 20l3-3 3 3"/>',
  'Refrigerados':'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M5 11h14M9 6v2m0 6v3M14 14v4"/>',
  'Croquetas':'<ellipse cx="7.5" cy="15" rx="3.5" ry="5" transform="rotate(-26 7.5 15)"/><ellipse cx="16.5" cy="15" rx="3.5" ry="5" transform="rotate(26 16.5 15)"/><path d="M10 9c0-2 1-4 3-4s3 2 3 4"/><path d="M7 14h.01M17 15h.01"/>',
  'Halal':'<path d="M17 3a9 9 0 1 0 4 14A9 9 0 0 1 17 3Z"/><path d="m16.5 9 1 2 2 .3-1.5 1.5.4 2-1.9-1-1.8 1 .3-2-1.5-1.5 2-.3 1-2Z"/>',
  'Helados':'<circle cx="12" cy="9" r="5"/><path d="M7 14h10l-5 8-5-8ZM9 6c1-2 3-3 5-2"/>',
  'Mermeladas':'<rect x="5" y="7" width="14" height="14" rx="2"/><path d="M5 10h14M7 7V4h10v3M9 15c0-2 2-3 3-1 1-2 3-1 3 1 0 2-3 4-3 4s-3-2-3-4Z"/>',
  'Repostería y Postres':'<path d="M4 13h16l-2 7H6l-2-7ZM7 13c-1-4 2-6 5-5 3-2 6 1 5 5"/><circle cx="12" cy="5" r="1"/><path d="M12 6v2"/>',
  'Vinos Blancos':'<path d="M6 3h12l-1 7a5 5 0 0 1-10 0L6 3ZM12 15v5M8 21h8"/><path d="M7 8h10m-8 3h6"/>',
  'Vinos Rosados':'<path d="M6 3h12l-1 7a5 5 0 0 1-10 0L6 3ZM12 15v5M8 21h8"/><path d="M7 10c2-1 3 1 5 0s3 1 5 0"/>',
  'Espumosos y Champagne':'<path d="M7 6h10l-1 6a4 4 0 0 1-8 0L7 6ZM12 16v4M8 21h8"/><circle cx="10" cy="3" r="1"/><circle cx="15" cy="2" r=".7"/><circle cx="18" cy="5" r=".7"/>',
  'Cervezas y Licores':'<path d="M5 7h12v13H6L5 7ZM17 9h3v6h-3M5 11h12"/><path d="M6 7c-1-3 3-4 4-2 2-3 5-1 5 2"/>',
  'Terrinas y Especialidades Premium':'<rect x="3" y="11" width="18" height="9" rx="2"/><path d="M5 11c0-4 3-6 7-6s7 2 7 6M9 7l3-4 3 4M8 15h8"/>',
  'Patés de Navidad':'<path d="M4 13h16v7H4v-7ZM6 13c0-4 3-6 6-6s6 2 6 6"/><path d="m12 3 1 2 2 .3-1.5 1.5.3 2-1.8-1-1.8 1 .3-2L9 5.3l2-.3 1-2Z"/>',
  'Menaje y Utensilios':'<path d="M6 3v8a3 3 0 0 0 6 0V3M9 3v18M17 3c-3 3-3 8 0 10h2V3h-2ZM18 13v8"/>',
  'Servicios':'<path d="M3 17h18M5 17c0-6 3-10 7-10s7 4 7 10M9 5c1-2 5-2 6 0M11 5v2"/><circle cx="12" cy="4" r="1"/>',
  'Aceites y Vinagres':'<path d="M8 6h8v14H8V6ZM10 3h4v3M8 11h8M10 16c0-2 2-4 2-4s2 2 2 4a2 2 0 0 1-4 0Z"/>',
  'Sal, Azúcar y Salsas':'<path d="M5 8h14l-2 12H7L5 8ZM8 8V5h8v3M8 12h8"/><path d="M10 16h.01M14 16h.01"/>',
  'Arroz':'<path d="M4 14c0 5 4 7 8 7s8-2 8-7H4Z"/><path d="M6 12c1-3 3-4 6-4s5 1 6 4M9 5l1 2m4-2-1 2M8 10l1 1m6-1-1 1"/>',
  'Pasta Rellena (IQF)':'<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="3"/><path d="M7 4v2m5-2v2m5-2v2M7 18v2m5-2v2m5-2v2M4 8h2m-2 4h2m-2 4h2m12-8h2m-2 4h2m-2 4h2"/>',
  'Pasta Larga (IQF)':'<path d="M5 4h14M7 4c-1 5 1 8 0 12l-1 5m5-17c-1 5 1 8 0 12l-1 5m5-17c-1 5 1 8 0 12l-1 5m5-17c-1 5 1 8 0 12l-1 5"/>',
  'Harinas':'<path d="M6 7h12l2 13H4L6 7ZM8 7V4h8v3"/><path d="M12 10v7m-3-5 3 2 3-2"/>',
  'Rebozados':'<path d="M4 14c1-4 4-7 8-7 5 0 8 3 8 7 0 4-3 6-8 6s-8-2-8-6Z"/><circle cx="8" cy="13" r=".7" fill="currentColor" stroke="none"/><circle cx="13" cy="11" r=".7" fill="currentColor" stroke="none"/><circle cx="16" cy="16" r=".7" fill="currentColor" stroke="none"/><circle cx="10" cy="17" r=".7" fill="currentColor" stroke="none"/>',
  'Complementos de Panadería':'<path d="M4 15c0-5 3-9 8-9s8 4 8 9v4H4v-4ZM4 16h16M8 10l2 3m4-4 2 3"/>',
  'Bases de Pizza':'<path d="M3 5c5-3 13-3 18 0l-9 16L3 5ZM4 7c5-2 11-2 16 0"/><circle cx="10" cy="10" r="1.1"/><circle cx="14" cy="12" r="1.1"/>',
  'Lentejas':'<ellipse cx="6" cy="9" rx="2.3" ry="1.5" transform="rotate(-20 6 9)"/><ellipse cx="13" cy="7" rx="2.3" ry="1.5" transform="rotate(16 13 7)"/><ellipse cx="18" cy="13" rx="2.3" ry="1.5" transform="rotate(-20 18 13)"/><ellipse cx="7" cy="16" rx="2.3" ry="1.5" transform="rotate(16 7 16)"/><ellipse cx="13.5" cy="18" rx="2.3" ry="1.5" transform="rotate(-20 13.5 18)"/>',
  'Garbanzos':'<path d="M5 11c0-3 2-5 5-5 1.5 0 2.5.7 3 2 1-1 3-1 4 0 2 2 2 5 0 7-2 3-4 4-7 4-3 0-5-2-5-5Z"/><path d="M9 10c1 1 2 1 3 0M16 16c1-1 2-1 3 0"/>',
  'Alubias':'<path d="M4 12c-1-4 2-7 5-7 3 0 5 2 5 5-3-1-6 1-5 4 0 2-4 3-5-2ZM12 17c0-4 3-8 6-8s4 3 3 6c-2-1-4 1-4 3 0 3-5 3-5-1Z"/>',
  'Bacalao':'<path d="M3 12c3-5 10-7 15-3l3-2-1 5 1 5-3-2C13 19 6 17 3 12Z"/><path d="M7 12h9M11 8v8"/><circle cx="17" cy="12" r=".5"/>',
  'Gustosi (Salsas Untables)':'<rect x="5" y="9" width="14" height="11" rx="2"/><path d="M6 9V6h12v3M8 14c3-2 5-2 8 0M8 17c3-2 5-2 8 0"/>',
  'Rebozados y Panaturas':'<path d="M4 14c2-4 6-6 9-6s6 2 7 6c0 4-4 6-8 6s-8-2-8-6Z"/><path d="M7 11h.01M12 10h.01M17 12h.01M9 16h.01M15 17h.01"/>',
  'Hamburguesas y Mixes para Carne':'<path d="M4 11c1-4 4-6 8-6s7 2 8 6H4ZM4 14h16M5 17h14M6 20h12"/><path d="M8 8h.01M13 7h.01M16 9h.01"/>',
  'Aromas y Potenciadores de Sabor':'<path d="M8 9h8l2 11H6L8 9ZM9 9V5h6v4M12 5V3"/><path d="M8 14h8M12 17h.01M18 5l1-2m1 5 2-1"/>',
  'Rubs y Especias para Grill':'<path d="M6 10h12l-1 10H7L6 10ZM8 10V6h8v4M5 20h14"/><path d="M9 14h.01M12 16h.01M15 14h.01M18 5c-1-2 2-2 1-4"/>',
  'Marinadas y Adobos':'<path d="M6 11h12l-1 9H7l-1-9ZM5 11c1-2 3-3 7-3s6 1 7 3M8 15c2-2 6-2 8 0"/><path d="M10 4c-2-2 2-2 0-3M15 4c-2-2 2-2 0-3"/>'
};
function categoryPlaceholderSvg(title){
  const drawing=SUBFAMILY_ICONS[title];
  return drawing
    ? `<svg class="category-placeholder-icon" viewBox="0 0 24 24" aria-hidden="true">${drawing}</svg>`
    : '<svg class="category-placeholder-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v12H4zM8 7l2-3h4l2 3M8 13h8"/></svg>';
}

let favs = {};           // { "gi-ii": qty }
let clientName = '';
let selectedOnly = false;
let currentDept = 'all';
let searchTerm = '';
let onlyNew = false;
let countryFilter = '';
let regionFilter = '';
let familyFilter = '';
// staged values edited inside the filter sheet, committed on "Ver resultados"
let stagedCountry = '', stagedRegion = '', stagedDept = 'all', stagedFamily = '';
let openGroups = new Set();
let openDepts = new Set(); // categorías (departamentos) desplegadas en el listado principal
// Único punto de verdad: qué familias/grupos están abiertos se decide siempre aquí.
// Se llama cada vez que un filtro cambia de verdad (no al abrir/cerrar manualmente).
function resetOpenState(){ openDepts.clear(); openGroups.clear(); }

function normalize(s){
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// Very light Spanish singular/plural handling so "quesos" also finds "queso"
// and vice versa, without needing a full stemming library.
function wordVariants(word){
  const out = [word];
  if(word.length > 4 && word.endsWith('es')){
    const stem = word.slice(0, -2);
    if(/[nlrdzj]$/.test(stem)) out.push(stem);            // jamones -> jamon
  }
  if(word.length > 3 && word.endsWith('s')) out.push(word.slice(0, -1)); // quesos/aceites -> queso/aceite
  if(word.length > 2 && !word.endsWith('s')){
    out.push(word + 's');                                                  // queso -> quesos
    if(/[nlrdzj]$/.test(word)) out.push(word + 'es');                      // jamon -> jamones
  }
  return out;
}

// Splits the query into words (order-independent) and requires every word
// (or a singular/plural variant of it) to appear somewhere in the haystack.
// Common filler words ("ref", "referencia", "nº"...) are ignored so a natural
// search like "ref 6744" still finds reference 6744.
const SEARCH_STOPWORDS = new Set(['ref','refs','referencia','referencias','no','nº','n','num','numero']);

// Catalogue origin filter: product and brand evidence takes precedence over
// old, incomplete origin labels; unspecified products default to Spain.
const SPANISH_REGIONS = new Set(['Extremadura','Huelva','Aragón','Salamanca','León','Guijuelo','Jabugo']);
function inferGeography(group, item){
  const title = normalize(group.title || '');
  const dept = normalize(group.dept || '');
  const name = normalize(item.n || '');
  const raw = item.origin || '';
  const rawNorm = normalize(raw);
  const spanish = region => ({country:'Nacional', region});
  // Brand-level regional assignments apply to jamón, charcutería and their packs.
  if(/\bmontesano\b|\bmonterroble\b|\bmonteroble\b/.test(name)) return spanish('Extremadura');
  if(/\bbeherk?\b|\bcrego\b|\bprim\b/.test(name)) return spanish('Guijuelo');
  if(/\bdiaz\b/.test(name)) return spanish('Salamanca');
  if(/\bgalvan\b/.test(name)) return spanish('Huelva');
  if(/\baragon\b|\bpeson\b|\bmonroyo\b/.test(name)) return spanish('Aragón');
  if(/\bibisma\b/.test(name)) return spanish('Salamanca');
  if(/\bc\.pablo\b/.test(name)) return spanish('León');

  // Italian suppliers also occur outside the dedicated Italian families.
  if(/\bdivella\b|\bgran bologna\b|\bgea\b|\bcaputo\b|\b5 stagioni\b|\bviander\b|\bvillani\b|\bsoster\b|\btre archi\b|\bmutti\b|\bparmigiano\b|\bgrana padano\b|\bpecorino\b|\bburrata\b|\bgorgonzola\b|\bscamorza\b|\bstracciatella\b|\bricotta\b|\bmoliterno\b|\bcaccetti\b|\bbalsamico\b|\bnduja\b/.test(name)) return {country:'Italiano', region:''};
  if(dept === 'pasta italiana' || /quesos italianos|jamones italianos|embutidos italianos|conservas italianas|tomate italiano|pecorino/.test(title)) return {country:'Italiano', region:''};
  if(title === 'pato y oca' || /\bderhel\b|origine france|fabrique france|\bfrance\b|\bcanard\b|\broquefort\b|\bbrie\b|\bpresident\b|\bsociete\b/.test(name)) return {country:'Francés', region:''};
  if(name.includes('polca') || title === 'navidad — pates') return {country:'Bélgica', region:''};
  const foreign = {'italiano':'Italiano','frances':'Francés','belgica':'Bélgica','noruega':'Noruega'};
  if(foreign[rawNorm]) return {country:foreign[rawNorm], region:''};
  if(SPANISH_REGIONS.has(raw)) return spanish(raw);
  return spanish('');
}

DATA.forEach(group => group.items.forEach(item => {
  const geo = inferGeography(group, item);
  item.country = geo.country;
  item.region = geo.region;
}));

function updateOriginCounts(){
  const counts = {};
  DATA.forEach(g => g.items.forEach(it => { if(it.country) counts[it.country] = (counts[it.country] || 0) + 1; }));
  document.querySelectorAll('[data-country-count]').forEach(el => {
    const country = el.dataset.countryCount;
    const n = counts[country] || 0;
    el.textContent = `· ${n}`;
    const button = el.closest('.filter-option');
    if(button) button.hidden = n === 0;
  });
}
function matchesOrigin(it){
  if(countryFilter && it.country !== countryFilter) return false;
  if(regionFilter && it.region !== regionFilter) return false;
  return true;
}

function matchesQuery(haystack, query){
  const words = query.split(/\s+/).filter(Boolean).filter(w => !SEARCH_STOPWORDS.has(w));
  if(words.length === 0) return true;
  return words.every(w => wordVariants(w).some(v => haystack.includes(v)));
}

const ACCENT_MAP = {a:'[aá]', e:'[eé]', i:'[ií]', o:'[oó]', u:'[uúü]', n:'[nñ]'};
function accentFlexPattern(word){
  return word.split('').map(ch => ACCENT_MAP[ch] || ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('');
}
function buildHighlightRegex(query){
  const variants = new Set();
  query.split(/\s+/).filter(Boolean).forEach(w => wordVariants(w).forEach(v => variants.add(v)));
  const patterns = Array.from(variants).filter(v => v.length > 1).sort((a,b) => b.length - a.length).map(accentFlexPattern);
  return patterns.length ? new RegExp('(' + patterns.join('|') + ')', 'gi') : null;
}
function highlightName(name, regex){
  return regex ? name.replace(regex, '<mark>$1</mark>') : name;
}

const groupsEl = document.getElementById('groups');
const emptyState = document.getElementById('emptyState');
const resultCount = document.getElementById('resultCount');
const deptChips = document.getElementById('deptChips');
const controls = document.getElementById('controls');

// V22: sections/families live in the filter sheet, not in a horizontal chip carousel.

function updateChipsFade(){
  if(!deptChips) return;
  const atEnd = deptChips.scrollLeft + deptChips.clientWidth >= deptChips.scrollWidth - 4;
  deptChips.classList.toggle('at-end', atEnd);
}
if(deptChips){ deptChips.addEventListener('scroll', updateChipsFade, {passive:true}); updateChipsFade(); }

function setControlsHeight(){
  document.documentElement.style.setProperty('--controls-h', controls.offsetHeight + 'px');
}

function itemId(gi, ii){ return gi + '-' + ii; }
function findItem(id){ const [gi, ii] = id.split('-').map(Number); return DATA[gi].items[ii]; }
// ===== GMA · imágenes externas por referencia =====
// El HTML ya no contiene fotografías en Base64. Las rutas se resuelven desde
// data/images-manifest.json usando SIEMPRE la referencia exacta como texto.
const IMAGE_MANIFEST = Object.create(null);
const IMAGE_ASSET_VERSIONS = Object.freeze({
  '4476':'20260928-recuperada',
  '989900':'20260928-recuperada',
  '853':'20260924-foto-correcta',
  '2409':'20260924-selec-mardis',
  '2665':'20260924-selec-mardis',
  '5722':'20260924-fondo-blanco',
  '5311':'20260924-foto-correcta',
  '5867':'20260924-foto-correcta',
  '6607':'20260924-oficial-divella',
  '2762':'20260924-selec-mardis',
  '2898':'20260924-fondo-blanco',
  '3881':'20260924-fondo-blanco',
  '5627':'20260924-fondo-blanco',
  '6636':'20260924-selec-mardis',
  '6684':'20260923-fondo-blanco',
  '6705':'20260923-fondo-blanco',
  '6740':'20260923-fondo-blanco',
  '6742':'20260923-artesano',
  '6743':'20260923-fondo-blanco',
  '6744':'20260923-artesano',
  '6745':'20260923-artesano',
  '6747':'20260923-fondo-blanco',
  '6750':'20260923-fondo-blanco'
});
function productRefKey(item){
  return item && item.ref !== undefined && item.ref !== null ? String(item.ref).trim() : '';
}
function imageUrlsFor(item){
  const ref = productRefKey(item);
  if(!ref) return [];
  const value = IMAGE_MANIFEST[ref];
  // La primera foto de 5790 muestra colín; la segunda sí es el surtido.
  // Se corrige aquí para afectar únicamente a la web principal.
  const urls = ref==='5790' ? ['/images/products/5790-2.webp'] :
    (Array.isArray(value) ? value.filter(Boolean) : (value ? [value] : []));
  const version = IMAGE_ASSET_VERSIONS[ref];
  if(!version) return urls;
  return urls.map(url=>`${url}${url.includes('?') ? '&' : '?'}v=${version}`);
}
const SUPPLIER_PRODUCT_INFO = window.GMA_VERIFIED_PRODUCT_INFO || {};
function isTreArchiProductPhoto(url){ return /-producto-tre-archi\.[a-z0-9]+(?:[?#].*)?$/i.test(url || ''); }
function isProductInfoCard(url){ return /-informacion-(?:tre-archi|pasta|fabricante)\.[a-z0-9]+(?:[?#].*)?$/i.test(url || ''); }
function imageUrlFor(item){
  const urls=imageUrlsFor(item);
  return urls.find(isTreArchiProductPhoto) || urls[0] || '';
}
function supplierTechnicalHtml(item){
  const info=SUPPLIER_PRODUCT_INFO[productRefKey(item)];
  if(!info) return '';
  const facts=info.facts.map(([label,value])=>`<div><dt>${escapeCatalogText(label)}</dt><dd>${escapeCatalogText(value)}</dd></div>`).join('');
  const ingredients=info.ingredients?`<div class="supplier-ingredients"><dt>Ingredientes declarados</dt><dd>${escapeCatalogText(info.ingredients)}</dd></div>`:'<div class="supplier-ingredients"><dt>Ingredientes</dt><dd>No disponibles en la documentación incorporada. Consulta el envase.</dd></div>';
  return `<section class="supplier-technical" aria-label="Información técnica contrastada"><b class="supplier-technical-title">${escapeCatalogText(info.title)}</b><dl>${facts}${ingredients}</dl></section>`;
}
function productPhotoCropClass(item){ return ''; }
function productGalleryViews(item){
  const ref=productRefKey(item);
  const urls=imageUrlsFor(item);
  const treProduct=urls.find(isTreArchiProductPhoto);
  const explicitInfo=urls.find(isProductInfoCard);
  if(treProduct || explicitInfo){
    const product=treProduct || urls.find(url=>url!==explicitInfo);
    const info=explicitInfo || urls.find(url=>url!==product);
    const used=new Set([product,info].filter(Boolean));
    const views=[];
    if(product) views.push({url:product,crop:false,label:'Producto'});
    if(info) views.push({url:info,crop:false,label:'Información'});
    urls.filter(url=>!used.has(url)).forEach((url,i)=>views.push({url,crop:false,label:`Foto ${i+3}`}));
    return views;
  }
  if(productPhotoCropClass(item) && urls.length===1)
    return [{url:urls[0],crop:true,label:'Producto'},{url:urls[0],crop:false,label:'Información'}];
  return urls.map((url,i)=>({url,crop:false,label:`Foto ${i+1}`}));
}
window.GMA_IMAGE_MANIFEST_READY = fetch('data/images-manifest.json?v=20260924-tres-fotos-correctas', { cache:'no-store' })
  .then(response => {
    if(!response.ok) throw new Error(`No se pudo cargar images-manifest.json (${response.status})`);
    return response.json();
  })
  .then(manifest => {
    Object.assign(IMAGE_MANIFEST, manifest || {});
    document.documentElement.dataset.imagesReady = '1';
    // El catálogo puede haberse pintado antes de que termine la petición.
    if(typeof render === 'function') render();
    if(typeof window.GMA_REBUILD_DISCOVERY === 'function') window.GMA_REBUILD_DISCOVERY();
    return IMAGE_MANIFEST;
  })
  .catch(error => {
    console.warn('[GMA] Catálogo cargado sin manifiesto de imágenes:', error);
    document.documentElement.dataset.imagesReady = '0';
    return IMAGE_MANIFEST;
  });
function priceBlockHtml(it){
  const unitLabel = it.modo === 'K' ? 'kg' : 'ud';
  const caseLine = (it.modo !== 'K' && Number(it.unid) > 1)
    ? `<div class="price-case">Caja de ${it.unid} ${unitLabel}</div>`
    : '';
  return `
    <div class="price-block">
      <div class="price-unit">${unitLabel==='kg' ? 'Por kg' : 'Por unidad'}</div>
      ${caseLine}
    </div>`;
}
function favIds(){ return Object.keys(favs); }

function buildCarousel(){ /* V22 discovery strips replace the legacy carousel. */ }
function groupMatchesTextOnly(grp){
  return searchTerm && matchesQuery(grp.s, searchTerm);
}

const idleTask = window.requestIdleCallback
  ? cb => requestIdleCallback(cb,{timeout:220})
  : cb => setTimeout(()=>cb({timeRemaining:()=>8}),16);
const groupImageObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        groupImageObserver.unobserve(entry.target);
        hydrateGroupImages(entry.target);
      });
    },{rootMargin:'700px 0px'})
  : null;
let groupVirtualizationPaused=false;
const groupMountObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries=>{
      if(groupVirtualizationPaused) return;
      entries.forEach(entry=>{
        if(entry.isIntersecting) mountGroupItems(entry.target);
        else if(entry.target.dataset.virtualized==='1') virtualizeGroupItems(entry.target);
      });
    },{rootMargin:'1100px 0px'})
  : null;
function pauseGroupVirtualization(){
  groupVirtualizationPaused=true;
  if(groupMountObserver) groupMountObserver.takeRecords();
}
function resumeGroupVirtualization(){
  groupVirtualizationPaused=false;
  if(!groupMountObserver) return;
  groupsEl.querySelectorAll('.group[data-virtualized="1"]').forEach(group=>{
    groupMountObserver.unobserve(group);
    groupMountObserver.observe(group);
  });
}
function hydrateGroupImages(group){
  if(!group || group.dataset.imagesHydrating==='true') return;
  const pending=Array.from(group.querySelectorAll('img[data-src]'));
  if(!pending.length) return;
  group.dataset.imagesHydrating='true';
  const mountVersion=group.dataset.mountVersion;
  // Las primeras imágenes aparecen inmediatamente; el resto se reparte entre frames ociosos.
  pending.splice(0,6).forEach(img=>{img.src=img.dataset.src;img.removeAttribute('data-src')});
  const step=deadline=>{
    if(!group.isConnected || group.dataset.mounted!=='1' || group.dataset.mountVersion!==mountVersion){
      delete group.dataset.imagesHydrating;
      return;
    }
    let count=0;
    while(pending.length && count<8 && deadline.timeRemaining()>1){
      const img=pending.shift();
      img.src=img.dataset.src;
      img.removeAttribute('data-src');
      count++;
    }
    if(pending.length) idleTask(step);
    else delete group.dataset.imagesHydrating;
  };
  if(pending.length) idleTask(step); else delete group.dataset.imagesHydrating;
}

function queueGroupImageHydration(group){
  if(!group) return;
  if(groupImageObserver) groupImageObserver.observe(group);
  else hydrateGroupImages(group);
}

function deferredGroupHeight(itemCount){
  const count=Math.max(1,Number(itemCount)||1);
  if(document.body.classList.contains('carousel-view')) return 270;
  if(document.body.classList.contains('visual-view')){
    const cols=window.innerWidth>=1050?4:(window.innerWidth>=640?3:2);
    return Math.ceil(count/cols)*(window.innerWidth<=580?238:260)+16;
  }
  return count*(window.innerWidth<=580?104:98)+12;
}
function virtualizeGroupItems(groupSection){
  if(!groupSection || groupSection.dataset.virtualized!=='1' || groupSection.dataset.mounted!=='1') return;
  const list=groupSection.querySelector('.group-items');
  if(!list) return;
  if(groupImageObserver) groupImageObserver.unobserve(groupSection);
  const renderedHeight=Math.max(list.getBoundingClientRect().height,deferredGroupHeight(groupSection.dataset.itemCount));
  list.style.minHeight=`${renderedHeight}px`;
  list.replaceChildren();
  groupSection.classList.add('deferred-mount');
  groupSection.dataset.mounted='0';
  groupSection.dataset.mountVersion=String(Number(groupSection.dataset.mountVersion||0)+1);
  delete groupSection.dataset.imagesHydrating;
}
function deferGroupItems(groupSection){
  if(!groupSection || groupSection.dataset.mounted==='1') return;
  const list=groupSection.querySelector('.group-items');
  if(!list) return;
  groupSection.classList.add('deferred-mount');
  list.style.minHeight=`${deferredGroupHeight(groupSection.dataset.itemCount)}px`;
  if(groupMountObserver) groupMountObserver.observe(groupSection);
  else mountGroupItems(groupSection);
}
window.GMA_REFRESH_DEFERRED_GROUPS=()=>{
  groupsEl.querySelectorAll('.group[data-virtualized="1"]').forEach(group=>{
    const list=group.querySelector('.group-items');
    if(!list) return;
    // Cuando el usuario cambia de vista, la reserva debe adoptar el tamaño
    // de las tarjetas nuevas y no conservar el de la vista anterior.
    if(group.dataset.mounted==='1'){
      list.style.minHeight='';
      list.style.minHeight=`${Math.ceil(list.getBoundingClientRect().height)}px`;
    } else list.style.minHeight=`${deferredGroupHeight(group.dataset.itemCount)}px`;
  });
};

function getVisibleItemsForGroup(grp, gi){
  const groupWideMatch = groupMatchesTextOnly(grp);
  let items = grp.items.map((it, ii) => ({it, ii}));
  return {groupWideMatch, items: items.filter(({it,ii}) => {
    const id=itemId(gi,ii);
    return (!searchTerm || groupWideMatch || matchesQuery(it.s, searchTerm)) &&
      (!onlyNew || it.isNew) &&
      (!selectedOnly || Object.prototype.hasOwnProperty.call(favs,id)) &&
      matchesOrigin(it);
  })};
}

// Build product rows only when a family is actually opened. This is the key
// performance optimization: the catalogue can have ~1,000 references without
// keeping ~1,000 complex cards alive in the DOM at the same time.
function mountGroupItems(groupSection){
  if(!groupSection || groupSection.dataset.mounted === '1') return;
  if(groupMountObserver) groupMountObserver.unobserve(groupSection);
  const gi=Number(groupSection.dataset.groupId);
  const grp=DATA[gi];
  const list=groupSection.querySelector('.group-items');
  if(!grp || !list) return;
  const {groupWideMatch,items}=getVisibleItemsForGroup(grp,gi);
  const highlightRegex=searchTerm ? buildHighlightRegex(searchTerm) : null;
  const frag=document.createDocumentFragment();
  let prevWasDividerOrFirst=true;
  let prevSub=null;
  for(const {it,ii} of items){
    const id=itemId(gi,ii);
    const isFav=Object.prototype.hasOwnProperty.call(favs,id);
    const showDivider=it.sub && it.sub!==prevSub;
    if(it.sub) prevSub=it.sub;
    if(showDivider){
      const div=document.createElement('div');
      div.className='sub-divider'+(prevWasDividerOrFirst?' first':'');
      div.textContent=it.sub;
      frag.appendChild(div);
      prevWasDividerOrFirst=true;
    }
    const row=document.createElement('div');
    row.className='item'+(isFav?' fav':'')+(prevWasDividerOrFirst?' no-border':'');
    row.style.setProperty('--fam', grp.color);
    row.dataset.id=id;
    row.setAttribute('role','button');
    row.setAttribute('tabindex','0');
    row.setAttribute('aria-label',`Ver ficha de ${it.n}`);
    const imageUrl=imageUrlFor(it);
    const photoHtml=imageUrl
      ? `<div class="item-photo has-photo"><img class="${productPhotoCropClass(it)}" data-src="${imageUrl}" alt="" loading="lazy" decoding="async"></div>`
      : `<div class="item-photo placeholder" style="--fam:${grp.color}">${categoryPlaceholderSvg(grp.title)}${it.origin?`<span class="fam-origin">${it.origin}</span>`:''}</div>`;
    row.innerHTML=`
      <div class="item-photo-wrap">
        ${photoHtml}
        <button class="add-btn tap" data-id="${id}" aria-label="${isFav?'Quitar de la selección':'Añadir a la selección'}: ${escapeCatalogText(it.n)}" aria-pressed="${isFav}">
          <svg viewBox="0 0 24 24">${isFav?'<path d="M4 12l5 5L20 6" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M12 5v14M5 12h14" stroke-linecap="round"/>'}</svg>
        </button>
      </div>
      <div class="item-body">
        <div class="item-top">
          <div>
            <div class="item-name">${highlightRegex?highlightName(it.n,highlightRegex):it.n}</div>
            <div class="item-meta">
              ${it.isNew?'<span class="tag new-badge">Nuevo</span>':''}
              ${(it.modo==='K'||it.unid<=1)?`<span class="tag">${it.unid} ud/caja</span>`:''}
            </div>
            <div class="ref">Ref. ${it.ref}</div>
          </div>
          ${priceBlockHtml(it)}
        </div>
      </div>`;
    frag.appendChild(row);
    prevWasDividerOrFirst=false;
  }
  list.replaceChildren(frag);
  // Un grupo diferido conserva su altura reservada al montar las tarjetas.
  // Así el documento no se encoge mientras el dedo sigue desplazándolo.
  if(groupSection.dataset.virtualized==='1'){
    list.style.minHeight=`${Math.ceil(list.getBoundingClientRect().height)}px`;
  } else list.style.minHeight='';
  groupSection.classList.remove('deferred-mount');
  groupSection.dataset.mounted='1';
  groupSection.dataset.mountVersion=String(Number(groupSection.dataset.mountVersion||0)+1);
  // Al desplegar todo no iniciamos cientos de descargas a la vez. Las fotos
  // se activan cuando su familia se acerca a la pantalla.
  queueGroupImageHydration(groupSection);
  if(groupSection.dataset.virtualized==='1' && groupMountObserver) groupMountObserver.observe(groupSection);
}

function unmountClosedGroups(){
  // Keep the open family (or selected review families) mounted. Releasing closed
  // families also releases their decoded image memory on long browsing sessions.
  groupsEl.querySelectorAll('.group').forEach(g=>{
    if(g.classList.contains('open')) return;
    if(groupImageObserver) groupImageObserver.unobserve(g);
    if(groupMountObserver) groupMountObserver.unobserve(g);
    const list=g.querySelector('.group-items');
    if(list){if(g.dataset.mounted==='1')list.replaceChildren();list.style.minHeight='';}
    g.classList.remove('deferred-mount');
    delete g.dataset.virtualized;
    g.dataset.mounted='0';
  });
}

function render(){
  if(groupImageObserver) groupsEl.querySelectorAll('.group').forEach(g=>groupImageObserver.unobserve(g));
  if(groupMountObserver) groupsEl.querySelectorAll('.group').forEach(g=>groupMountObserver.unobserve(g));
  groupsEl.replaceChildren();
  let totalVisible=0;
  const hasActiveFilter=!!searchTerm || onlyNew || selectedOnly || countryFilter || regionFilter || familyFilter;
  const rootFrag=document.createDocumentFragment();

  DEPTS.forEach(({name:dept})=>{
    if(currentDept!=='all' && dept!==currentDept) return;
    const deptGroups=DATA.map((g,gi)=>({g,gi})).filter(x=>x.g.dept===dept);
    const deptFrag=document.createDocumentFragment();
    let deptHasVisible=false;

    for(const {g:grp,gi} of deptGroups){
      if(familyFilter && grp.title!==familyFilter) continue;
      const {items:visibleItems}=getVisibleItemsForGroup(grp,gi);
      const visibleInGroup=visibleItems.length;
      if(!visibleInGroup) continue;
      totalVisible+=visibleInGroup;
      deptHasVisible=true;

      const groupSection=document.createElement('div');
      groupSection.className='group';
      groupSection.style.setProperty('--fam',grp.color);
      groupSection.dataset.title=grp.title;
      groupSection.dataset.groupId=String(gi);
      groupSection.dataset.itemCount=String(visibleInGroup);
      groupSection.dataset.mounted='0';

      const header=document.createElement('button');
      header.className='group-header tap';
      const shouldOpen=openGroups.has(grp.title);
      header.setAttribute('aria-expanded',shouldOpen?'true':'false');
      header.setAttribute('aria-label',`${grp.title}, ${visibleInGroup} ${visibleInGroup===1?'producto':'productos'}`);
      header.innerHTML=`
        <span class="group-title-wrap"><span class="group-title">${grp.title}</span></span>
        <span class="group-count" aria-hidden="true">${visibleInGroup}</span>
        <svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      const body=document.createElement('div'); body.className='group-body';
      const inner=document.createElement('div'); inner.className='group-body-inner';
      const list=document.createElement('div'); list.className='group-items';
      inner.appendChild(list); body.appendChild(inner);
      groupSection.append(header,body);
      if(shouldOpen) groupSection.classList.add('open');
      deptFrag.appendChild(groupSection);
    }
    if(deptHasVisible){
      const isOpen = openDepts.has(dept);
      const deptHeader=document.createElement('button');
      deptHeader.type='button';
      deptHeader.className='dept-header tap'+(isOpen?' open':'');
      deptHeader.dataset.dept=dept;
      deptHeader.setAttribute('aria-expanded',isOpen?'true':'false');
      deptHeader.setAttribute('aria-label',`${dept}, familia de productos`);
      deptHeader.innerHTML=`<span class="dept-copy"><span class="dept-header-label">${dept}</span></span><svg class="chev" width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      rootFrag.append(deptHeader);
      if(isOpen) rootFrag.append(deptFrag);
    }
  });
  // El estado abierto/cerrado de cada grupo lo decide únicamente el usuario (openGroups),
  // igual en móvil que en escritorio, y con o sin filtro aplicado.
  groupsEl.appendChild(rootFrag);

  // Una apertura masiva crea primero estructuras ligeras y conserva su altura.
  // Las tarjetas se montan al acercarse a la pantalla, evitando bloquear el gesto.
  const openSections=Array.from(groupsEl.querySelectorAll('.group.open'));
  const openItemTotal=openSections.reduce((sum,g)=>sum+Number(g.dataset.itemCount||0),0);
  const deferLargeCatalogue=openSections.length>8 || openItemTotal>140;
  openSections.forEach((group,index)=>{
    if(deferLargeCatalogue) group.dataset.virtualized='1';
    if(!deferLargeCatalogue || index<3) mountGroupItems(group);
    else deferGroupItems(group);
  });

  emptyState.style.display=totalVisible===0?'block':'none';
  const carouselSection=document.getElementById('carouselSection');
  if(carouselSection && carouselSection.dataset.hasItems!=='false'){
    carouselSection.style.display=hasActiveFilter?'none':'';
  }
  resultCount.textContent=hasActiveFilter ? `${totalVisible} resultados` : '';
  document.querySelector('.quick-row')?.classList.toggle('has-content', hasActiveFilter);
  controls.classList.toggle('has-active-filters',hasActiveFilter);
  const catalogueTotal=DATA.reduce((sum,g)=>sum+g.items.length,0);
  document.getElementById('statTotal').textContent=catalogueTotal;
  const mainCount=document.getElementById('catalogMainCount'); if(mainCount) mainCount.textContent=`${totalVisible} de ${catalogueTotal} referencias`;
  document.getElementById('statCats').textContent=DATA.length;
  updateExpandLabel();
  requestAnimationFrame(setControlsHeight);
}

// Un arrastre horizontal o vertical nunca debe convertirse después en un click.
// Es especialmente importante en los carruseles táctiles y durante un scroll rápido.
let cataloguePointerStart=null;
let suppressCatalogueClickUntil=0;
groupsEl.addEventListener('pointerdown',e=>{
  if(e.pointerType==='mouse' && e.button!==0) return;
  cataloguePointerStart={id:e.pointerId,x:e.clientX,y:e.clientY};
},{passive:true});
groupsEl.addEventListener('pointermove',e=>{
  if(!cataloguePointerStart || cataloguePointerStart.id!==e.pointerId) return;
  if(Math.hypot(e.clientX-cataloguePointerStart.x,e.clientY-cataloguePointerStart.y)>12){
    suppressCatalogueClickUntil=performance.now()+450;
  }
},{passive:true});
const finishCataloguePointer=e=>{
  if(cataloguePointerStart && cataloguePointerStart.id===e.pointerId) cataloguePointerStart=null;
};
groupsEl.addEventListener('pointerup',finishCataloguePointer,{passive:true});
groupsEl.addEventListener('pointercancel',finishCataloguePointer,{passive:true});

// Event delegation: one listener handles every add-button and every group header,
// so tapping them patches just that DOM node instead of rebuilding all 988 items.
groupsEl.addEventListener('click', (e) => {
  if(performance.now()<suppressCatalogueClickUntil){
    e.preventDefault();
    e.stopPropagation();
    return;
  }
  const favBtn = e.target.closest('.add-btn');
  if(favBtn){
    e.stopPropagation();
    toggleFav(favBtn.dataset.id);
    return;
  }
  const photo = e.target.closest('.item-photo.has-photo img');
  if(photo){
    e.stopPropagation();
    const name = photo.closest('.item').querySelector('.item-name').textContent;
    openLightbox(photo.src, name, photo.closest('.item'), photo.closest('.item').dataset.id);
    return;
  }
  const itemRow = e.target.closest('.item');
  if(itemRow){
    openProduct(itemRow.dataset.id, itemRow);
    return;
  }
  const deptHeader = e.target.closest('.dept-header');
  if(deptHeader){
    const dept = deptHeader.dataset.dept;
    if(openDepts.has(dept)) openDepts.delete(dept); else openDepts.add(dept);
    const scrollAnchor = deptHeader.getBoundingClientRect().top;
    render();
    requestAnimationFrame(()=>{
      const fresh = groupsEl.querySelector(`.dept-header[data-dept="${CSS.escape(dept)}"]`);
      if(fresh){
        const safeTop=(controls?.offsetHeight||0)+4;
        const rect=fresh.getBoundingClientRect();
        if(Math.abs(rect.top - scrollAnchor) > 2){
          const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          window.scrollTo({top:Math.max(0,window.scrollY + rect.top - safeTop), behavior:reduce?'auto':'smooth'});
        }
      }
    });
    return;
  }
  const header = e.target.closest('.group-header');
  if(header){
    const groupSection = header.closest('.group');
    const title = groupSection.dataset.title;
    const nowOpen = !groupSection.classList.contains('open');
    groupSection.classList.toggle('open', nowOpen);
    header.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
    if(nowOpen){
      openGroups.add(title);
      mountGroupItems(groupSection);
      // En móvil solo reajustamos si el encabezado queda oculto bajo los controles.
      // No forzamos scroll cuando ya está visible: evita saltos al abrir/cerrar familias.
      if(window.matchMedia('(max-width:580px)').matches){
        requestAnimationFrame(()=>{
          const rect=header.getBoundingClientRect();
          const safeTop=(controls?.offsetHeight||0)+4;
          if(rect.top < safeTop){
            const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({
              top:Math.max(0,window.scrollY + rect.top - safeTop),
              behavior:reduce?'auto':'smooth'
            });
          }
        });
      }
    } else {
      openGroups.delete(title);
      if(groupMountObserver) groupMountObserver.unobserve(groupSection);
      // Release closed family DOM on the next idle turn; this keeps long sessions light.
      const release=()=>unmountClosedGroups();
      if('requestIdleCallback' in window) requestIdleCallback(release,{timeout:300}); else setTimeout(release,80);
    }
    updateExpandLabel();
  }
});
groupsEl.addEventListener('keydown', (e) => {
  const row = e.target.closest('.item');
  if(row && (e.key === 'Enter' || e.key === ' ')){
    e.preventDefault();
    openProduct(row.dataset.id, row);
  }
});

const lightboxBackdrop = document.getElementById('lightboxBackdrop');

// Reference-counted scroll lock: the lightbox can open on top of the sheet,
// so closing one must not unlock scroll while the other is still open.
let scrollLockCount = 0;
let savedScrollY = 0;
let savedScrollAnchor = null;
let scrollRestoreTimer = null;
let scrollRestoreFrame = 0;
let finishScrollRestore = null;
let savedOverflowAnchor = '';
function scrollImmediately(y){
  const root=document.documentElement;
  const previous=root.style.scrollBehavior;
  root.style.scrollBehavior='auto';
  window.scrollTo({top:Math.max(0,y),behavior:'auto'});
  root.style.scrollBehavior=previous;
}
function lockScroll(anchorEl){
  if(scrollLockCount === 0){
    if(finishScrollRestore) finishScrollRestore();
    savedScrollY = window.scrollY;
    savedScrollAnchor = anchorEl && anchorEl.isConnected
      ? {element:anchorEl, top:anchorEl.getBoundingClientRect().top}
      : null;
    pauseGroupVirtualization();
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = 'auto';
  }
  scrollLockCount++;
}
function unlockScroll(){
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if(scrollLockCount === 0){
    const anchor=savedScrollAnchor;
    const root=document.documentElement;
    savedOverflowAnchor=root.style.overflowAnchor;
    root.style.overflowAnchor='none';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    let finished=false;
    const finishRestore=()=>{
      if(finished) return;
      finished=true;
      if(scrollRestoreFrame) cancelAnimationFrame(scrollRestoreFrame);
      if(scrollRestoreTimer) clearTimeout(scrollRestoreTimer);
      scrollRestoreFrame=0;
      scrollRestoreTimer=null;
      if(anchor && anchor.element.isConnected){
        const delta=anchor.element.getBoundingClientRect().top-anchor.top;
        if(Math.abs(delta)>1){
          savedScrollY=Math.max(0,savedScrollY+delta);
          scrollImmediately(savedScrollY);
        }
        try{anchor.element.focus({preventScroll:true});}catch(_error){}
      }
      root.style.overflowAnchor=savedOverflowAnchor;
      savedScrollAnchor=null;
      finishScrollRestore=null;
      resumeGroupVirtualization();
    };
    finishScrollRestore=finishRestore;
    // One immediate placement plus, at most, one anchor correction on the
    // next frame. Repeated delayed corrections made the catalogue "spring".
    scrollImmediately(savedScrollY);
    scrollRestoreFrame=requestAnimationFrame(finishRestore);
    scrollRestoreTimer=setTimeout(finishRestore,80);
  }
}

// Safari/iOS puede perder el primer `click` de un botón situado sobre una hoja
// animada. Touchend cubre el toque real y click cubre ratón y teclado. Nunca
// cerramos en mousedown: retirar la hoja antes de mouseup puede activar el
// control situado debajo y reabrirla (el efecto de "muelle").
function bindReliableClose(button, closeFn){
  if(!button) return;
  let touchHandled=false;
  button.addEventListener('touchend',e=>{
    touchHandled=true;
    e.preventDefault();
    e.stopPropagation();
    closeFn();
    setTimeout(()=>{touchHandled=false;},450);
  },{passive:false});
  button.addEventListener('click',e=>{
    e.preventDefault();
    e.stopPropagation();
    if(touchHandled) return;
    closeFn();
  });
}

function bindBackdropClose(backdrop, closeFn){
  if(!backdrop) return;
  let start=null;
  let suppressClickUntil=0;
  backdrop.addEventListener('pointerdown',e=>{
    if(e.target!==backdrop) return;
    start={id:e.pointerId,x:e.clientX,y:e.clientY,moved:false};
  },{passive:true});
  backdrop.addEventListener('pointermove',e=>{
    if(!start || start.id!==e.pointerId) return;
    if(Math.hypot(e.clientX-start.x,e.clientY-start.y)>12) start.moved=true;
  },{passive:true});
  backdrop.addEventListener('pointerup',e=>{
    if(!start || start.id!==e.pointerId) return;
    const isTap=e.target===backdrop && !start.moved;
    suppressClickUntil=performance.now()+500;
    start=null;
    if(!isTap) return;
    e.preventDefault();
    e.stopPropagation();
    closeFn();
  });
  backdrop.addEventListener('pointercancel',()=>{
    if(start) suppressClickUntil=performance.now()+500;
    start=null;
  },{passive:true});
  backdrop.addEventListener('click',e=>{
    if(e.target!==backdrop) return;
    e.stopPropagation();
    if(performance.now()<suppressClickUntil) return;
    closeFn();
  });
}

let productOpen = false;
let productCloseTimer = null;
let productOpenFrame = 0;
let currentProductId = null;
let productNavigationItems = null;
const productBackdrop = document.getElementById('productBackdrop');
const productSheet = document.getElementById('productSheet');
const productDetail = document.getElementById('productDetail');

function itemContext(id){
  const [gi, ii] = id.split('-').map(Number);
  return {group:DATA[gi], item:DATA[gi].items[ii], gi, ii};
}
function productFact(label, value){
  if(value === null || value === undefined || value === '') return '';
  return `<div class="product-fact"><span>${label}</span><b>${value}</b></div>`;
}

function getCurrentFilteredItems(){
  const out=[];
  DATA.forEach((g,gi)=>g.items.forEach((it,ii)=>{
    const id=itemId(gi,ii);
    if(currentDept!=='all'&&g.dept!==currentDept)return;
    if(familyFilter&&g.title!==familyFilter)return;
    if(onlyNew&&!it.isNew)return;
    if(selectedOnly&&!favs.hasOwnProperty(id))return;
    if(searchTerm&&!matchesQuery(it.s,searchTerm)&&!matchesQuery(g.s,searchTerm))return;
    if(!matchesOrigin(it))return;
    out.push({g,it,id});
  }));
  return out;
}


// El catálogo no contiene una ficha técnica comprobada para todas las referencias.
// La descripción evita afirmar ingredientes, sabor, rendimiento o modo de preparación.
function escapeCatalogText(value){
  return String(value).replace(/[&<>"]/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
}
function productDescription(group,item){
  const suggestedUses={
    'Pasta Italiana':'primeros platos y guarniciones',
    'Jamones y Paletas':'tablas y bocadillos',
    'Embutidos':'tablas y bocadillos',
    'Quesos y Lácteos':'tablas y cocina',
    'Pescados y Salazones':'aperitivos y entrantes',
    'Repostería':'carta de postres',
    'Vinos y Bebidas':'carta de bebidas',
    'Aperitivos':'aperitivos y servicio de barra'
  };
  const suggestion=suggestedUses[group.dept];
  return {
    desc:`Referencia clasificada en «${escapeCatalogText(group.title)}» dentro de «${escapeCatalogText(group.dept)}».`,
    use:suggestion
      ? `Ideas de uso orientativas: ${suggestion}. Comprueba ingredientes y preparación en la ficha del fabricante.`
      : 'Comprueba ingredientes, alérgenos y preparación en el envase o la ficha del fabricante.'
  };
}

function renderProductDetail(id){
  const previousFocus=productDetail.contains(document.activeElement)?document.activeElement.id:null;
  const {group,item} = itemContext(id);
  const selected = favs.hasOwnProperty(id);
  const unit = MODO_LABEL[item.modo] || 'ud';
  const format = item.modo === 'K' ? `${item.unid} ud/caja · venta por kg` : `${item.unid} ud/caja`;
  const imageUrls = imageUrlsFor(item);
  const imageViews = productGalleryViews(item);
  const safeName = escapeCatalogText(item.n);
  const visual = imageViews.length
    ? `<div class="product-gallery"><div class="product-visual"><img class="${imageViews[0].crop?'product-photo-crop':''}" src="${imageViews[0].url}" alt="${safeName}" loading="eager" decoding="async"><button class="product-nav-arrow prev tap" id="productPrevArrow" type="button" aria-label="Producto anterior"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button><button class="product-nav-arrow next tap" id="productNextArrow" type="button" aria-label="Producto siguiente"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>${imageViews.length>1?`<div class="product-gallery-thumbs">${imageViews.map((view,i)=>`<button class="product-gallery-thumb ${imageViews[0].label==='Producto'?'pilot-gallery-thumb':''} ${i===0?'active':''}" data-gallery-index="${i}" aria-label="Ver ${view.label}">${imageViews[0].label==='Producto'?`<span class="pilot-thumb-frame"><img class="${view.crop?'product-photo-crop':''}" src="${view.url}" alt="" loading="lazy" decoding="async"></span><span class="pilot-thumb-label">${view.label}</span>`:`<img src="${view.url}" alt="" loading="lazy" decoding="async">`}</button>`).join('')}</div>`:''}</div>`
    : `<div class="product-visual placeholder" style="--fam:${group.color}">${categoryPlaceholderSvg(group.title)}${item.origin?`<span class="fam-origin">${item.origin}</span>`:''}<button class="product-nav-arrow prev tap" id="productPrevArrow" type="button" aria-label="Producto anterior"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button><button class="product-nav-arrow next tap" id="productNextArrow" type="button" aria-label="Producto siguiente"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>`;
  productDetail.innerHTML = `
    <div class="product-detail-layout">
      <div class="product-detail-media">${visual}${SUPPLIER_PRODUCT_INFO[item.ref]?.imageNote?`<p class="product-note">${escapeCatalogText(SUPPLIER_PRODUCT_INFO[item.ref].imageNote)}</p>`:''}</div>
      <div class="product-detail-info">
        <h3 class="product-detail-title">${escapeCatalogText(item.n)}</h3>
        <div class="product-detail-ref">Referencia ${item.ref}</div>
        ${SUPPLIER_PRODUCT_INFO[item.ref]?'':(()=>{const c=productDescription(group,item);return `<div class="product-description"><b>Sobre el producto</b><p>${c.desc}</p><p class="use">${c.use}</p></div>`})()}
        ${supplierTechnicalHtml(item)}
        <div class="product-facts">
          ${productFact('Familia', group.title)}
          ${productFact('Departamento', group.dept)}
          ${productFact('Formato', format)}
          ${productFact('Origen orientativo', SUPPLIER_PRODUCT_INFO[item.ref]?.origin || item.region || ({Nacional:'España', Italiano:'Italia', Francés:'Francia', Bélgica:'Bélgica', Noruega:'Noruega'}[item.country] || 'No indicado'))}
        </div>
        <div class="product-detail-nav"><button class="product-nav-btn tap" id="productPrevBtn">← Anterior</button><span id="productPosition"></span><button class="product-nav-btn tap" id="productNextBtn">Siguiente →</button></div>
        <div class="product-detail-actions">
          <button class="btn-primary tap" id="productSelectBtn">${selected ? '✓ Quitar de la selección' : '+ Añadir a la selección'}</button>
          <button class="btn-icon tap" id="productShareBtn" aria-label="Compartir producto"><svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M18 8a3 3 0 1 0-2.83-4A3 3 0 0 0 18 8ZM6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm12 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM8.6 16.5l6.8 3M15.4 6.5l-6.8 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
        </div>
        <div class="product-note">Información orientativa de catálogo. La selección no formaliza un pedido.</div>
      </div>
    </div>`;
  document.getElementById('productSelectBtn').onclick = () => {
    toggleFav(id);
    renderProductDetail(id);
  };
  document.getElementById('productShareBtn').onclick = () => shareProduct(id);
  const navItems = productNavigationItems || getCurrentFilteredItems();
  const navPos = navItems.findIndex(x=>x.id===id);
  const posEl=document.getElementById('productPosition'); if(posEl) posEl.textContent=navPos>=0?`${navPos+1} de ${navItems.length}`:'';
  const goToPrevProduct=()=>{if(navItems.length<=1)return;const x=navItems[(navPos-1+navItems.length)%navItems.length];currentProductId=x.id;renderProductDetail(x.id);};
  const goToNextProduct=()=>{if(navItems.length<=1)return;const x=navItems[(navPos+1)%navItems.length];currentProductId=x.id;renderProductDetail(x.id);};
  document.getElementById('productPrevBtn').onclick=goToPrevProduct;
  document.getElementById('productNextBtn').onclick=goToNextProduct;
  const prevArrow=document.getElementById('productPrevArrow');
  const nextArrow=document.getElementById('productNextArrow');
  const onlyOneProduct=navItems.length<=1;
  if(prevArrow){prevArrow.hidden=onlyOneProduct;prevArrow.onclick=e=>{e.stopPropagation();goToPrevProduct();};}
  if(nextArrow){nextArrow.hidden=onlyOneProduct;nextArrow.onclick=e=>{e.stopPropagation();goToNextProduct();};}
  const visualEl=productDetail.querySelector('.product-visual');
  if(visualEl){
    const selectOnPhoto=document.createElement('button');
    selectOnPhoto.type='button';
    selectOnPhoto.className='product-photo-select';
    selectOnPhoto.setAttribute('aria-pressed',String(selected));
    selectOnPhoto.textContent=selected?'✓ Seleccionado':'+ Añadir a la selección';
    selectOnPhoto.addEventListener('click',e=>{e.stopPropagation();toggleFav(id);});
    visualEl.appendChild(selectOnPhoto);
    let startX=0,startY=0;
    visualEl.addEventListener('touchstart',e=>{
      if(e.touches.length!==1)return;
      startX=e.touches[0].clientX;startY=e.touches[0].clientY;
    },{passive:true});
    visualEl.addEventListener('touchend',e=>{
      if(e.changedTouches.length!==1||e.target.closest('.product-nav-arrow'))return;
      const dx=e.changedTouches[0].clientX-startX;
      const dy=e.changedTouches[0].clientY-startY;
      if(!onlyOneProduct&&Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.4){
        if(dx<0)goToNextProduct();else goToPrevProduct();
      }
    },{passive:true});
  }
  const img = productDetail.querySelector('.product-visual img');
  const thumbs = productDetail.querySelectorAll('.product-gallery-thumb');
  thumbs.forEach(btn => btn.onclick = () => {
    const index = Number(btn.dataset.galleryIndex || 0);
    if(img && imageViews[index]) { img.src = imageViews[index].url; img.classList.toggle('product-photo-crop', !!imageViews[index].crop); }
    thumbs.forEach(x => x.classList.toggle('active', x === btn));
  });
  // La ficha ya muestra la fotografía a tamaño útil. No se abre un segundo
  // modal al tocarla: un solo nivel de apertura/cierre evita capas y saltos.
  if(img) img.onclick = null;
  if(previousFocus) document.getElementById(previousFocus)?.focus({preventScroll:true});
}
function openProduct(id, sourceEl){
  if(productOpen) return;
  GMAPanels.open(document.getElementById('productSheet'));
  if(productCloseTimer){clearTimeout(productCloseTimer);productCloseTimer=null;}
  if(productOpenFrame){cancelAnimationFrame(productOpenFrame);productOpenFrame=0;}
  currentProductId = id;
  const sourceShelf=sourceEl?.closest('.discovery-scroll');
  const desktopSource=sourceEl?.closest('#desktopProducts');
  if(sourceShelf){
    productNavigationItems=[...sourceShelf.querySelectorAll('[data-product-id]')].map(el=>{const id=el.dataset.productId;const {group:g,item:it}=itemContext(id);return {id,g,it};});
  }else if(desktopSource&&window.GMA_DESKTOP_ITEMS){productNavigationItems=window.GMA_DESKTOP_ITEMS;}
  else productNavigationItems=getCurrentFilteredItems();
  if(!productNavigationItems.some(x=>x.id===id)){const {group:g,item:it}=itemContext(id);productNavigationItems=[{id,g,it}];}
  renderProductDetail(id);
  productBackdrop.classList.add('show');
  productOpen = true;
  lockScroll(sourceEl);
  productOpenFrame=requestAnimationFrame(()=>{
    productOpenFrame=0;
    if(!productOpen) return;
    productBackdrop.classList.add('in');
    productSheet.classList.add('in');
  });
}
function closeProduct(){
  if(!productOpen) return;
  GMAPanels.close(document.getElementById('productSheet'));
  if(productOpenFrame){cancelAnimationFrame(productOpenFrame);productOpenFrame=0;}
  productBackdrop.classList.remove('in');
  productSheet.classList.remove('in');
  if(productCloseTimer) clearTimeout(productCloseTimer);
  productCloseTimer=setTimeout(()=>{if(productOpen)return;productBackdrop.classList.remove('show');productDetail.innerHTML='';productCloseTimer=null;},130);
  productOpen = false;
  currentProductId = null;
  unlockScroll();
}
async function shareProduct(id){
  const {group,item} = itemContext(id);
  const text = `${item.n}
Ref. ${item.ref}
${group.title}
${new URL('?ref='+encodeURIComponent(item.ref),location.href).href}`;
  try{
    if(navigator.share) await navigator.share({title:item.n,text});
    else { await navigator.clipboard.writeText(text); showToast('Ficha copiada'); }
  }catch(err){ if(err && err.name !== 'AbortError') showToast('No se pudo compartir'); }
}
bindReliableClose(document.getElementById('productClose'), closeProduct);
bindBackdropClose(productBackdrop, closeProduct);

let lightboxOpen = false;
let lightboxCloseTimer = null;
function openLightbox(src, name, sourceEl, id){
  if(!src) return;
  if(lightboxCloseTimer){
    clearTimeout(lightboxCloseTimer);
    lightboxCloseTimer = null;
  }
  const img = document.getElementById('lightboxImg');
  img.src = src;
  img.alt = name || 'Imagen ampliada del producto';
  document.getElementById('lightboxName').textContent = name || '';
  const select=document.getElementById('lightboxSelect');
  select.hidden=!id;
  select.dataset.id=id||'';
  select.setAttribute('aria-pressed',String(!!id&&Object.prototype.hasOwnProperty.call(favs,id)));
  select.textContent=id&&Object.prototype.hasOwnProperty.call(favs,id)?'✓ Seleccionado':'+ Añadir a la selección';
  GMAPanels.open(lightboxBackdrop);
  lightboxBackdrop.classList.add('show');
  // Forzar un nuevo fotograma garantiza que la transición funcione también
  // después de cerrar y volver a abrir el visor en Safari/iOS.
  requestAnimationFrame(() => requestAnimationFrame(() => lightboxBackdrop.classList.add('in')));
  if(!lightboxOpen){
    lightboxOpen = true;
    lockScroll(sourceEl);
  }
}
function closeLightbox(){
  if(!lightboxOpen) return;
  GMAPanels.close(lightboxBackdrop);
  lightboxOpen = false;
  lightboxBackdrop.classList.remove('in');
  if(lightboxCloseTimer) clearTimeout(lightboxCloseTimer);
  lightboxCloseTimer = setTimeout(() => {
    // No ocultar ni vaciar si el usuario ya ha abierto otra imagen.
    if(lightboxOpen) return;
    lightboxBackdrop.classList.remove('show');
    const img = document.getElementById('lightboxImg');
    img.removeAttribute('src');
    img.alt = '';
    lightboxCloseTimer = null;
  }, 130);
  unlockScroll();
}
bindReliableClose(document.getElementById('lightboxClose'), closeLightbox);
bindBackdropClose(lightboxBackdrop, closeLightbox);
document.getElementById('lightboxSelect').addEventListener('click',e=>{
  const id=e.currentTarget.dataset.id;
  if(id) toggleFav(id);
});
document.getElementById('sheetList').addEventListener('click', (e) => {
  const photo = e.target.closest('.item-photo.has-photo img');
  if(!photo) return;
  const name = photo.closest('.sheet-item').querySelector('.sheet-item-name').textContent;
  openLightbox(photo.src, name, photo.closest('.sheet-item'), photo.closest('.sheet-item').dataset.id);
});

const PLUS_ICON = '<path d="M12 5v14M5 12h14" stroke-linecap="round"/>';
const CHECK_ICON = '<path d="M4 12l5 5L20 6" stroke-linecap="round" stroke-linejoin="round"/>';

function toggleFav(id){
  if(favs.hasOwnProperty(id)) delete favs[id]; else favs[id] = 1;
  saveState();
  updateStats();
  syncSelectionState(id);
  const pressedBtn=document.querySelector(`.add-btn[data-id="${id}"]`);
  if(pressedBtn){
    pressedBtn.classList.remove('pop');
    requestAnimationFrame(()=>pressedBtn.classList.add('pop'));
  }
  const bar = document.getElementById('favBar');
  bar.classList.remove('pulse');
  requestAnimationFrame(()=>bar.classList.add('pulse'));
}


function syncSelectionState(id){
  const isFav = Object.prototype.hasOwnProperty.call(favs,id);
  if(currentProductId===id){
    const photoButton=productDetail.querySelector('.product-photo-select');
    if(photoButton){photoButton.setAttribute('aria-pressed',String(isFav));photoButton.textContent=isFav?'✓ Seleccionado':'+ Añadir a la selección';}
    const detailButton=document.getElementById('productSelectBtn');
    if(detailButton)detailButton.textContent=isFav?'✓ Quitar de la selección':'+ Añadir a la selección';
  }
  const lightboxButton=document.getElementById('lightboxSelect');
  if(lightboxOpen&&lightboxButton.dataset.id===id){
    lightboxButton.setAttribute('aria-pressed',String(isFav));
    lightboxButton.textContent=isFav?'✓ Seleccionado':'+ Añadir a la selección';
  }
  document.querySelectorAll(`.add-btn[data-id="${id}"]`).forEach(btn=>{
    btn.closest('.item, .sheet-item')?.classList.toggle('fav',isFav);
    btn.setAttribute('aria-pressed',String(isFav));
    btn.setAttribute('aria-label',`${isFav?'Quitar de la selección':'Añadir a la selección'}: ${findItem(id).n}`);
    const svg=btn.querySelector('svg');
    if(svg) svg.innerHTML=isFav?CHECK_ICON:PLUS_ICON;
  });
  const row=document.querySelector(`.item[data-id="${id}"]`);
  if(row) row.classList.toggle('fav',isFav);
  document.querySelectorAll(`.discovery-add[data-id="${id}"]`).forEach(btn=>{
    btn.closest('.discovery-card')?.classList.toggle('fav',isFav);
    btn.setAttribute('aria-pressed',String(isFav));
    btn.setAttribute('aria-label',`${isFav?'Quitar de la selección':'Añadir a la selección'}: ${findItem(id).n}`);
    const svg=btn.querySelector('svg');if(svg)svg.innerHTML=isFav?CHECK_ICON:PLUS_ICON;
  });
}

function currentVisibleGroups(){
  return DATA.filter((g,gi) => {
    if(currentDept !== 'all' && g.dept !== currentDept) return false;
    if(familyFilter && g.title !== familyFilter) return false;
    return getVisibleItemsForGroup(g,gi).items.length > 0;
  });
}
function updateExpandLabel(){
  const control=document.getElementById('expandAll');
  if(!control) return;
  const visibleGroups=currentVisibleGroups();
  const allOpen = visibleGroups.length > 0 && visibleGroups.every(g => openDepts.has(g.dept) && openGroups.has(g.title));
  control.innerHTML = allOpen
    ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6 15l6-6 6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Recoger todo'
    : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg> Desplegar todo';
  control.setAttribute('aria-label', allOpen ? 'Recoger todas las familias' : 'Desplegar todas las familias');
}

function updateStats(){
  const n = favIds().length;
  document.getElementById('statFav').textContent = n;
  document.getElementById('favCount').textContent = n;
  const selectedCountEl=document.getElementById('selectedChipCount'); if(selectedCountEl) selectedCountEl.textContent=n;
  document.getElementById('favBar').classList.toggle('show', n > 0);
  document.getElementById('backTop').style.bottom = n > 0 ? '92px' : '20px';
  if(sheetOpen) renderSheet();
}

async function saveState(){
  const favRefs={}; Object.entries(favs).forEach(([id,qty])=>{const it=findItem(id);if(it)favRefs[String(it.ref)]=qty;});
  const value=JSON.stringify({favs,favRefs,clientName,catalogVersion:CATALOG_VERSION});
  const saved=GMAStorage.setItem('gma-catalog-state',value);
  if(window.storage) Promise.resolve().then(()=>window.storage.set('gma-catalog-state',value)).catch(()=>{});
  return saved;
}
async function loadState(){
  try{
    let value = GMAStorage.getItem('gma-catalog-state');
    if(!value && window.storage){
      const res = await window.storage.get('gma-catalog-state');
      value = res && res.value;
    }
    if(value){
      const parsed = JSON.parse(value);
      const migrated={};
      if(parsed.favRefs){ Object.entries(parsed.favRefs).forEach(([ref,qty])=>{const id=REF_TO_ID_V22[String(ref)];if(id)migrated[id]=qty;}); }
      else { Object.entries(parsed.favs||{}).forEach(([oldId,qty])=>{const ref=LEGACY_ID_TO_REF_V21[oldId];const id=ref&&REF_TO_ID_V22[String(ref)];if(id)migrated[id]=qty;}); }
      favs = migrated;
      clientName = parsed.clientName || '';
      document.getElementById('clientInput').value = clientName;
    }
  }catch(err){}
  updateStats();
  render();
  setControlsHeight();
}

// Al escribir solo cambia el desplegable. El catálogo y la posición de lectura
// se actualizan una vez, cuando se confirma con Intro o «Ver resultados».
const searchInput=document.getElementById('searchInput');
const searchSuggestions=document.getElementById('searchSuggestions');
const searchSuggestionList=document.getElementById('searchSuggestionList');
const suggestionCatalog=DATA.flatMap((group,gi)=>group.items.map((item,ii)=>({
  id:itemId(gi,ii),item,group,name:normalize(item.n),ref:String(item.ref)
})));
let suggestedProducts=[];
let activeSuggestion=-1;
function hideSearchSuggestions(){
  searchSuggestions.hidden=true;
  searchInput.setAttribute('aria-expanded','false');
  searchInput.removeAttribute('aria-activedescendant');
  activeSuggestion=-1;
}
function markActiveSuggestion(index){
  activeSuggestion=index;
  searchSuggestionList.querySelectorAll('.search-suggestion').forEach((row,i)=>{
    const active=i===index;
    row.classList.toggle('is-active',active);
    row.setAttribute('aria-selected',String(active));
    if(active){
      searchInput.setAttribute('aria-activedescendant',row.id);
      if(row.offsetTop+row.offsetHeight>searchSuggestions.scrollTop+searchSuggestions.clientHeight)
        searchSuggestions.scrollTop=row.offsetTop+row.offsetHeight-searchSuggestions.clientHeight;
      else if(row.offsetTop<searchSuggestions.scrollTop) searchSuggestions.scrollTop=row.offsetTop;
    }
  });
  if(index<0)searchInput.removeAttribute('aria-activedescendant');
}
function updateSearchSuggestions(){
  const typed=searchInput.value.trim();
  const query=normalize(typed);
  document.getElementById('clearSearch').classList.toggle('show',!!typed);
  if(!query||!document.getElementById('siteHeader').classList.contains('search-open')){
    hideSearchSuggestions();return;
  }
  suggestedProducts=suggestionCatalog.filter(({item,group})=>
    matchesQuery(item.s,query)||matchesQuery(normalize(group.title),query)||matchesQuery(normalize(group.dept),query)
  ).map(result=>{
    const {name,ref,group}=result;
    const rank=ref===query?0:ref.startsWith(query)?1:name.startsWith(query)?2:
      matchesQuery(name,query)?3:matchesQuery(normalize(group.title),query)?4:5;
    return {...result,rank};
  }).sort((a,b)=>a.rank-b.rank||a.item.n.localeCompare(b.item.n,'es')).slice(0,6);
  searchSuggestionList.innerHTML=suggestedProducts.length?suggestedProducts.map(({id,item,group},i)=>{
    const photo=imageUrlFor(item);
    const image=photo?`<img src="${escapeCatalogText(photo)}" alt="" loading="lazy" decoding="async">`:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="m6 16 4-4 3 3 2-2 3 3"/></svg>';
    return `<button class="search-suggestion" type="button" role="option" id="searchSuggestion${i}" data-id="${id}" aria-selected="false"><span class="search-suggestion-photo">${image}</span><span class="search-suggestion-copy"><span class="search-suggestion-name">${escapeCatalogText(item.n)}</span><span class="search-suggestion-meta">Ref. ${escapeCatalogText(item.ref)} · ${escapeCatalogText(group.title)}</span></span></button>`;
  }).join(''):'<div class="search-suggestions-empty">No hay productos sugeridos. Puedes buscar en todo el catálogo.</div>';
  document.getElementById('searchSuggestionsAll').textContent=`Ver todos los resultados de «${typed}» →`;
  searchSuggestions.hidden=false;
  searchInput.setAttribute('aria-expanded','true');
  markActiveSuggestion(-1);
}
function commitSearch(){
  const nextTerm=normalize(searchInput.value.trim());
  hideSearchSuggestions();
  searchInput.blur();
  if(nextTerm!==searchTerm){
    searchTerm=nextTerm;
    resetOpenState();
    if(searchTerm)currentVisibleGroups().forEach(g=>{openDepts.add(g.dept);openGroups.add(g.title);});
    render();
  }
  if(nextTerm)setTimeout(scrollToResults,180);
}
function openSearchSuggestion(id){
  hideSearchSuggestions();
  searchInput.blur();
  openProduct(id,document.getElementById('topSearchToggle'));
}
searchInput.addEventListener('input',e=>{if(!e.isComposing)updateSearchSuggestions();});
searchInput.addEventListener('compositionend',updateSearchSuggestions);
searchInput.addEventListener('keydown',e=>{
  if(e.isComposing)return;
  if(e.key==='ArrowDown'||e.key==='ArrowUp'){
    if(searchSuggestions.hidden||!suggestedProducts.length)return;
    e.preventDefault();
    markActiveSuggestion((activeSuggestion+(e.key==='ArrowDown'?1:-1)+suggestedProducts.length)%suggestedProducts.length);
  }else if(e.key==='Enter'){
    e.preventDefault();
    if(activeSuggestion>=0&&suggestedProducts[activeSuggestion])openSearchSuggestion(suggestedProducts[activeSuggestion].id);
    else commitSearch();
  }else if(e.key==='Escape'&&!searchSuggestions.hidden){
    e.preventDefault();e.stopPropagation();hideSearchSuggestions();
  }
});
searchSuggestionList.addEventListener('click',e=>{
  const row=e.target.closest('.search-suggestion');
  if(row)openSearchSuggestion(row.dataset.id);
});
document.getElementById('searchSuggestionsAll').addEventListener('click',commitSearch);
document.getElementById('clearSearch').addEventListener('click', () => {
  searchInput.value='';
  document.getElementById('clearSearch').classList.remove('show');
  hideSearchSuggestions();
  if(searchTerm){searchTerm='';resetOpenState();render();}
  searchInput.focus({preventScroll:true});
});
window.GMA_HIDE_SEARCH_SUGGESTIONS=hideSearchSuggestions;
window.GMA_UPDATE_SEARCH_SUGGESTIONS=updateSearchSuggestions;
window.GMA_IMAGE_MANIFEST_READY?.then(()=>{if(!searchSuggestions.hidden)updateSearchSuggestions();});
function clearAllFilters(){
  document.getElementById('searchInput').value = '';
  hideSearchSuggestions();
  searchTerm = '';
  currentDept = 'all';
  onlyNew = false;
  selectedOnly = false;
  document.getElementById('selectedChip')?.classList.remove('active');
  countryFilter = ''; regionFilter = ''; familyFilter = '';
  updateFilterBadge();
  document.getElementById('clearSearch').classList.remove('show');
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  resetOpenState();
  render();
  scrollToResults();
}
document.getElementById('emptyReset').addEventListener('click', clearAllFilters);

let scrollToResultsFrame = 0;
function scrollToResults(){
  cancelAnimationFrame(scrollToResultsFrame);
  scrollToResultsFrame = requestAnimationFrame(() => {
    // Place the first catalogue section directly below the fixed header and
    // view controls, including when the search panel changes header height.
    const headerH=document.getElementById('siteHeader')?.getBoundingClientRect().height||0;
    const desktopCatalog=document.getElementById('desktopCatalog');
    const showDesktop=desktopCatalog&&getComputedStyle(desktopCatalog).display!=='none';
    const controlsH = showDesktop?0:controls.offsetHeight;
    const rect = (showDesktop?desktopCatalog:groupsEl).getBoundingClientRect();
    const target = window.scrollY + rect.top - headerH - controlsH - 4;
    if(Math.abs(target - window.scrollY) > 4){
      scrollImmediately(target);
    }
  });
}

if(deptChips) deptChips.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if(!chip) return;
  if(chip.id === 'selectedChip') return;
  if(chip.id === 'newChip'){
    selectedOnly = false;
    document.getElementById('selectedChip')?.classList.remove('active');
    document.body.classList.remove('selected-review');
    onlyNew = !onlyNew;
    chip.classList.toggle('active', onlyNew);
    resetOpenState();
    render();
    scrollToResults();
    return;
  }
  selectedOnly = false;
  document.getElementById('selectedChip')?.classList.remove('active');
  document.body.classList.remove('selected-review');
  currentDept = chip.dataset.dept;
  document.querySelectorAll('.chip[data-dept]').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  resetOpenState();
  render();
  scrollToResults();
});

document.getElementById('expandAll')?.addEventListener('click', () => {
  const control=document.getElementById('expandAll');
  if(control?.disabled) return;
  if(control){control.disabled=true;control.setAttribute('aria-busy','true');}
  const visibleGroups=currentVisibleGroups();
  const allOpen=visibleGroups.length>0 && visibleGroups.every(g=>openDepts.has(g.dept) && openGroups.has(g.title));
  if(allOpen){
    visibleGroups.forEach(g=>openGroups.delete(g.title));
    [...new Set(visibleGroups.map(g=>g.dept))].forEach(dept=>openDepts.delete(dept));
  } else {
    visibleGroups.forEach(g=>{
      openDepts.add(g.dept);
      openGroups.add(g.title);
    });
  }
  groupsEl.classList.add('bulk-update');
  render();
  let finished=false;
  const finishBulkUpdate=()=>{
    if(finished)return;
    finished=true;
    groupsEl.classList.remove('bulk-update');
    if(control){control.disabled=false;control.removeAttribute('aria-busy');}
  };
  requestAnimationFrame(finishBulkUpdate);
  setTimeout(finishBulkUpdate,180);
});


// ---- back to top ----
const backTop = document.getElementById('backTop');
let backTopFrame=0;
window.addEventListener('scroll', () => {
  if(backTopFrame) return;
  backTopFrame=requestAnimationFrame(()=>{
    backTop.classList.toggle('show', window.scrollY > 700);
    backTopFrame=0;
  });
}, {passive:true});
backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// ---- favourites sheet ----
let sheetOpen = false;
let sheetCloseTimer = null;
const sheetBackdrop = document.getElementById('sheetBackdrop');
const sheet = document.getElementById('sheet');

function renderSheet(){
  const list = document.getElementById('sheetList');
  list.innerHTML = '';
  const ids = favIds();
  if(ids.length === 0){
    list.innerHTML = '<p style="text-align:center;color:var(--ink-soft);font-size:13px;padding:24px 0;">Aún no has seleccionado ningún producto.</p>';
  } else {
    ids.forEach(id => {
      const it = findItem(id);
      const group = itemContext(id).group;
      const qty = favs[id];
      const row = document.createElement('div');
      row.className = 'sheet-item';
      row.dataset.id = id;
      const imageUrl = imageUrlFor(it);
      const photoHtml = imageUrl
        ? `<div class="item-photo has-photo"><img class="${productPhotoCropClass(it)}" src="${imageUrl}" alt="" loading="lazy" decoding="async"></div>`
        : `<div class="item-photo placeholder">${categoryPlaceholderSvg(group.title)}</div>`;
      row.innerHTML = `
        ${photoHtml}
        <div class="sheet-item-info">
          <div class="sheet-item-name">${it.n}</div>
          <div class="sheet-item-ref">Ref. ${it.ref} · ${MODO_LABEL[it.modo]||it.modo}</div>
          <button class="sheet-item-remove" data-id="${id}">Quitar</button>
        </div>
        <div class="sheet-item-right">
          <div class="qty-stepper">
            <button data-id="${id}" data-action="dec" aria-label="Restar unidad">−</button>
            <span>${qty}</span>
            <button data-id="${id}" data-action="inc" aria-label="Sumar unidad">+</button>
          </div>
        </div>
      `;
      list.appendChild(row);
    });
  }

  list.querySelectorAll('.sheet-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id=btn.dataset.id;
      const row=btn.closest('.sheet-item');
      row?.classList.add('removing');
      delete favs[id];
      saveState();
      syncSelectionState(id);
      updateStats();
      // Rebuild the catalogue only when the active view depends on the selection.
      if(selectedOnly) render();
      setTimeout(()=>renderSheet(),140);
    });
  });
  list.querySelectorAll('.qty-stepper button').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if(btn.dataset.action === 'inc') favs[id] = (favs[id]||1) + 1;
      else favs[id] = Math.max(1, (favs[id]||1) - 1);
      saveState(); updateStats(); renderSheet();
    });
  });
}

function openSheet(){
  if(sheetOpen) return;
  GMAPanels.open(document.getElementById('sheet'));
  if(sheetCloseTimer){clearTimeout(sheetCloseTimer);sheetCloseTimer=null;}
  sheetOpen = true;
  renderSheet();
  sheetBackdrop.classList.add('show');
  requestAnimationFrame(() => { sheetBackdrop.classList.add('in'); sheet.classList.add('in'); });
  lockScroll();
}
function closeSheet(){
  if(!sheetOpen) return;
  GMAPanels.close(document.getElementById('sheet'));
  sheetOpen = false;
  sheetBackdrop.classList.remove('in'); sheet.classList.remove('in');
  if(sheetCloseTimer) clearTimeout(sheetCloseTimer);
  sheetCloseTimer=setTimeout(()=>{if(sheetOpen)return;sheetBackdrop.classList.remove('show');sheetCloseTimer=null;},130);
  unlockScroll();
}
document.getElementById('favBar').addEventListener('click', openSheet);
bindReliableClose(document.getElementById('sheetClose'), closeSheet);
bindBackdropClose(sheetBackdrop, closeSheet);

// ---- filter panel ----
let filterOpen = false;
let filterCloseTimer = null;
const filterBackdrop = document.getElementById('filterBackdrop');
const filterSheet = document.getElementById('filterSheet');
function syncFilterUI(){
  document.querySelectorAll('#originOptions .filter-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.country === stagedCountry);
  });
  document.querySelectorAll('#regionOptions .filter-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.region === stagedRegion);
  });
  const ds=document.getElementById('deptFilterSelect'); if(ds) ds.value=stagedDept==='all'?'':stagedDept;
  populateFamilySelect(stagedDept, stagedFamily);
}
function openFilterPanel(){
  if(filterOpen) return;
  GMAPanels.open(document.getElementById('filterSheet'));
  if(filterCloseTimer){clearTimeout(filterCloseTimer);filterCloseTimer=null;}
  filterOpen=true;
  stagedCountry = countryFilter; stagedRegion = regionFilter; stagedDept = currentDept; stagedFamily = familyFilter;
  syncFilterUI();
  filterBackdrop.classList.add('show');
  requestAnimationFrame(() => { filterBackdrop.classList.add('in'); filterSheet.classList.add('in'); });
  lockScroll();
}
function closeFilterPanel(){
  if(!filterOpen) return;
  GMAPanels.close(document.getElementById('filterSheet'));
  filterOpen=false;
  filterBackdrop.classList.remove('in'); filterSheet.classList.remove('in');
  if(filterCloseTimer) clearTimeout(filterCloseTimer);
  filterCloseTimer=setTimeout(()=>{if(filterOpen)return;filterBackdrop.classList.remove('show');filterCloseTimer=null;},130);
  unlockScroll();
}
function updateFilterBadge(){
  let n = 0;
  if(countryFilter) n++;
  if(regionFilter) n++;
  if(currentDept!=='all') n++;
  if(familyFilter) n++;
  const badge = document.getElementById('filterBadge');
  badge.textContent = n;
  badge.classList.toggle('show', n > 0);
  document.getElementById('filterBtn').classList.toggle('active', n > 0);
}
document.getElementById('filterBtn').addEventListener('click', openFilterPanel);
bindReliableClose(document.getElementById('filterClose'), closeFilterPanel);
bindBackdropClose(filterBackdrop, closeFilterPanel);
document.getElementById('originOptions').addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-option');
  if(!btn || btn.hidden) return;
  stagedCountry = btn.dataset.country || '';
  syncFilterUI();
});
document.getElementById('regionOptions').addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-option');
  if(!btn) return;
  stagedRegion = btn.dataset.region || '';
  // A Spanish region logically implies Spain.
  if(stagedRegion) stagedCountry = 'Nacional';
  syncFilterUI();
});
document.getElementById('filterApply').addEventListener('click', () => {
  countryFilter = stagedCountry; regionFilter = stagedRegion;
  currentDept = stagedDept || 'all'; familyFilter = stagedFamily || '';
  updateFilterBadge();
  closeFilterPanel();
  resetOpenState();
  render();
  scrollToResults();
});
document.getElementById('filterReset').addEventListener('click', () => {
  stagedCountry = ''; stagedRegion = ''; stagedDept='all'; stagedFamily='';
  countryFilter = ''; regionFilter = ''; currentDept='all'; familyFilter='';
  syncFilterUI();
  updateFilterBadge();
  closeFilterPanel();
  resetOpenState();
  render();
  scrollToResults();
});


let clearArmed = false;
let clearArmTimer;
document.getElementById('sheetClear').addEventListener('click', async () => {
  if(favIds().length === 0 && !clientName) return;
  const btn = document.getElementById('sheetClear');
  if(!clearArmed){
    clearArmed = true;
    btn.textContent = '¿Seguro?';
    clearArmTimer = setTimeout(() => { clearArmed = false; btn.textContent = 'Vaciar'; }, 2500);
    return;
  }
  window.clearTimeout(clearArmTimer);
  clearArmed = false;
  btn.textContent = 'Vaciar';
  favs = {};clientName='';document.getElementById('clientInput').value='';
  await saveState(); updateStats(); render(); renderSheet();
});

document.getElementById('clientInput').addEventListener('input', (e) => {
  clientName = e.target.value;
  saveState();
});

// ---- PDF generation (native print) ----

// ---- toast (replaces native alert, which is blocked in sandboxed iframes) ----
let toastTimer;
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ---- PDF generation (real downloadable file via jsPDF, no print dialog needed) ----
function todayEs(){
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const d = new Date();
  return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
}
function slug(s){
  return (s||'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9]+/g,'_').replace(/^_+|_+$/g,'') || 'catalogo';
}

function buildProposalText(){
  const ids = favIds();
  const lines = ['GMA DISFOOD — PROPUESTA COMERCIAL'];
  if(clientName) lines.push('Cliente: ' + clientName);
  lines.push('Fecha: ' + todayEs());
  lines.push('');
  ids.forEach((id, i) => {
    const it = findItem(id);
    const qty = favs[id];
    const unitLabel = MODO_LABEL[it.modo] || it.modo;
    lines.push(`${i+1}. ${it.n}`);
    lines.push(`   Ref. ${it.ref} · ${unitLabel} × ${qty}`);
  });
  lines.push('');
  const totalUnitsTxt = ids.reduce((s,id)=>s+favs[id],0);
  lines.push(`Total: ${ids.length} referencia${ids.length===1?'':'s'} · ${totalUnitsTxt} unidades`);
  return lines.join('\n');
}

async function copyProposalAsPdfFallback(){
  const text = buildProposalText();
  try{
    await navigator.clipboard.writeText(text);
    showToast('No se pudo generar el PDF, pero he copiado la propuesta — pégala donde quieras.');
  }catch(err){
    showToast('No se pudo generar el PDF ni copiar el texto. Revisa tu conexión.');
  }
}
async function shareProposal(){
  if(favIds().length === 0){
    showToast('Selecciona al menos un producto antes de compartir.');
    return;
  }
  const text = buildProposalText();
  if(navigator.share){
    try{
      await navigator.share({ text, title: 'Propuesta GMA Disfood' });
      return;
    }catch(err){
      if(err && err.name === 'AbortError') return; // user cancelled the share sheet, nothing to do
      // otherwise fall through to clipboard below
    }
  }
  try{
    await navigator.clipboard.writeText(text);
    showToast('Propuesta copiada — pégala donde quieras.');
  }catch(err){
    showToast('No se pudo compartir ni copiar automáticamente.');
  }
}
document.getElementById('copyTextBtn').addEventListener('click', shareProposal);

async function generatePdf(){
  const ids = favIds();
  if(ids.length === 0){
    showToast('Selecciona al menos un producto antes de generar el PDF.');
    return;
  }
  const btn = document.getElementById('sheetPdf');
  const originalLabel = btn.innerHTML;
  btn.innerHTML = 'Preparando PDF…';
  btn.disabled = true;

  try{
    await ensurePdfLibraries();
    btn.innerHTML = 'Generando…';
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit:'mm', format:'a4' });
    const pageW = doc.internal.pageSize.getWidth();

    doc.setFillColor(128,0,0);
    doc.rect(0,0,pageW,26,'F');
    doc.setTextColor(255,255,255);
    doc.setFont('helvetica','bold');
    doc.setFontSize(18);
    doc.text('GMA Disfood', 14, 15);
    doc.setFontSize(9.5);
    doc.setFont('helvetica','normal');
    doc.text('PROPUESTA COMERCIAL', 14, 21.5);

    doc.setTextColor(28,35,33);
    doc.setFontSize(9.5);
    let metaY = 33;
    if(clientName){
      doc.setFont('helvetica','bold');
      doc.text('Cliente:', pageW - 14 - doc.getTextWidth('Cliente: ' + clientName), metaY);
      doc.setFont('helvetica','normal');
      doc.text(clientName, pageW - 14 - doc.getTextWidth(clientName), metaY);
      metaY += 5;
    }
    doc.text(todayEs(), pageW - 14 - doc.getTextWidth(todayEs()), metaY);
    metaY += 5;
    const totalUnits = ids.reduce((s,id)=>s+favs[id],0);
    const summaryLine = `${ids.length} referencias · ${totalUnits} unidades`;
    doc.text(summaryLine, pageW - 14 - doc.getTextWidth(summaryLine), metaY);
    const tableStartY = 40;

    const rows = ids.map((id, i) => {
      const it = findItem(id);
      const qty = favs[id];
      const unitLabel = MODO_LABEL[it.modo] || it.modo;
      return [
        String(i+1),
        `${it.n}\nRef. ${it.ref} · ${it.unid} ud/caja`,
        unitLabel,
        String(qty),
      ];
    });

    doc.autoTable({
      startY: tableStartY,
      head: [['#','Producto','Formato','Cant.']],
      body: rows,
      theme: 'striped',
      styles: { font:'helvetica', fontSize:8.5, textColor:[28,35,33], cellPadding:2.4 },
      headStyles: { fillColor:[128,0,0], textColor:255, fontStyle:'bold', fontSize:8.5 },
      alternateRowStyles: { fillColor:[247,245,239] },
      columnStyles: {
        0:{cellWidth:8},
        2:{halign:'right', cellWidth:20},
        3:{halign:'right', cellWidth:16},
      },
      margin:{left:14, right:14},
    });

    const pageCount = doc.internal.getNumberOfPages();
    for(let p = 1; p <= pageCount; p++){
      doc.setPage(p);
      doc.setFont('helvetica','normal');
      doc.setFontSize(7.5);
      doc.setTextColor(138,146,140);
      doc.text(
        `Documento generado desde el catálogo GMA Disfood el ${todayEs()}. Consulte las condiciones con su comercial asignado.`,
        14, doc.internal.pageSize.getHeight() - 10, { maxWidth: pageW - 28 }
      );
    }

    doc.save(`Propuesta_GMA_${slug(clientName)}.pdf`);
    showToast('PDF preparado. Comprueba las descargas del navegador.');
  } catch(err){
    await copyProposalAsPdfFallback();
  } finally {
    btn.innerHTML = originalLabel;
    btn.disabled = false;
  }
}

document.getElementById('sheetPdf').addEventListener('click', generatePdf);

window.addEventListener('resize', setControlsHeight);
document.addEventListener('keydown', (e) => {
  if(e.key !== 'Escape') return;
  if(lightboxBackdrop.classList.contains('show')) { closeLightbox(); return; }
  if(productBackdrop.classList.contains('show')) { closeProduct(); return; }
  if(indexBackdrop.classList.contains('show')) { closeIndex(); return; }
  if(filterBackdrop.classList.contains('show')) { closeFilterPanel(); return; }
  if(sheet.classList.contains('in')) { closeSheet(); return; }
});

// ---- índice de familias ----
const indexSheet = document.getElementById('indexSheet');
const indexBackdrop = document.getElementById('indexBackdrop');
let indexOpen = false;
function buildCatalogIndex(){
  const list = document.getElementById('indexList');
  list.innerHTML = '';
  DEPTS.forEach(({name}) => {
    const title = document.createElement('div');
    title.className = 'index-dept';
    title.textContent = name;
    list.appendChild(title);
    DATA.forEach((grp) => {
      if(grp.dept !== name) return;
      const btn = document.createElement('button');
      btn.className = 'index-link tap';
      btn.innerHTML = `<span>${grp.title}</span><small aria-hidden="true">›</small>`;
      btn.addEventListener('click', () => jumpToGroup(grp.title, name));
      list.appendChild(btn);
    });
  });
}
function openIndex(){
  if(indexOpen) return;
  GMAPanels.open(document.getElementById('indexSheet'));
  buildCatalogIndex();
  indexOpen = true;
  indexBackdrop.classList.add('show');
  requestAnimationFrame(()=>{ indexBackdrop.classList.add('in'); indexSheet.classList.add('in'); });
  document.body.style.overflow='hidden';
}
function closeIndex(){
  if(!indexOpen) return;
  GMAPanels.close(document.getElementById('indexSheet'));
  indexOpen = false;
  indexBackdrop.classList.remove('in'); indexSheet.classList.remove('in');
  setTimeout(()=>indexBackdrop.classList.remove('show'),250);
  document.body.style.overflow='';
}
function jumpToGroup(title, dept){
  closeIndex();
  currentDept = dept; onlyNew = false; searchTerm = '';
  document.getElementById('searchInput').value='';
  openGroups.add(title);
  document.querySelectorAll('.chip[data-dept]').forEach(c=>c.classList.toggle('active', c.dataset.dept===dept));
  render();
  setTimeout(()=>{
    const target=[...document.querySelectorAll('.group')].find(el=>el.dataset.title===title);
    if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
  },80);
}
document.getElementById('catalogIndexBtn')?.addEventListener('click', openIndex);
bindReliableClose(document.getElementById('indexClose'), closeIndex);
bindBackdropClose(indexBackdrop, closeIndex);

// V23: never block the complete catalogue on storage restoration.
// Paint the catalogue immediately; loadState() may subsequently restore the saved selection.
updateStats();
render();
setControlsHeight();
buildCarousel();
loadState();

window.GMA_IMAGE_MANIFEST_READY?.finally(()=>{
  const ref=new URLSearchParams(location.search).get('ref');
  if(!ref)return;
  for(let gi=0;gi<DATA.length;gi++){const ii=DATA[gi].items.findIndex(it=>String(it.ref)===ref);if(ii>=0){openProduct(itemId(gi,ii));return;}}
  showToast('La referencia del enlace no está disponible');
});
