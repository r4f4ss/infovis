from pymongo import MongoClient

#pega a database 
CG=MongoClient().datavis

#indexa o campo principal 
CG.sim.create_index("CAUSABAS")

#array as operções a serem feitas
pipeline=[]

#passos do pipeline
count_by_CAUSABAS={ "$group": { '_id': "$CAUSABAS", 'count' : {"$sum" : 1}}}
sort={ "$sort": { "count": -1}}	
out={ "$out" : "sim_orderByCAUSABAS" }

pipeline.append(count_by_CAUSABAS)
pipeline.append(sort)
pipeline.append(out)

#executa o pipeline 
cursor=CG.sim.aggregate(pipeline)

if __name__ == '__main__':
	i=0
	#saida=open("juncoes.out","w")
	for ele in cursor:
		print(ele)
		if(i==10):break
		#saida.write(str(ele)+"\n")
		i=i+1
	#saida.close()
