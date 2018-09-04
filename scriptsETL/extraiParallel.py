from pymongo import MongoClient

#pega a database 
CG=MongoClient().datavis

#indexa o campo que sofrera a primeira juncao, que deve ser a juncao mais cara computacionalmente
CG.sim.create_index("CAUSABAS")

#array com as juncoes a serem feitas
pipeline=[]

match={ "$match" : { "CAUSABAS" : "N390" } }
project={ "$project" : { "SEXO" : 1 , "RACACOR" : 1, "ESTCIV" : 1, "ESC" : 1 } }
out={ "$out" : "sim_N390" }

pipeline.append(match)
pipeline.append(project)
pipeline.append(out)

#agregacao onde ocorrem as juncoes
cursor=CG.sim.aggregate(pipeline)

if __name__ == '__main__':
	i=0
	#saida=open("juncoes.out","w")
	for ele in cursor:
		print(ele)
		if(i==6):break
		#saida.write(str(ele)+"\n")
		i=i+1
	#saida.close()
