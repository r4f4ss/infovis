from pymongo import MongoClient

#pega a database 
CG=MongoClient().datavis

#indexa o campo principal 
CG.sim.create_index("QUARTOANO")

#array as operções a serem feitas
pipeline=[]

#passos do pipeline
match={ '$match': {  'CAUSABAS': 'N390' } }
count_by_QUARTOANO={ "$group": { '_id': "$QUARTOANO", 'count' : {"$sum" : 1}}}
sort={ "$sort": { "_id": 1}}	
#out={ "$out" : "sim_orderByQUARTOANO" }

pipeline.append(match)
pipeline.append(count_by_QUARTOANO)
pipeline.append(sort)
#pipeline.append(out)

#executa o pipeline 
cursor=CG.sim.aggregate(pipeline)

if __name__ == '__main__':
	i=0
	#saida=open("juncoes.out","w")
	for ele in cursor:
		print(ele)
		if(i==30):break
		#saida.write(str(ele)+"\n")
		i=i+1
	#saida.close()
