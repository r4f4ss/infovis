import csv

#arquivo de saida
out=open("sim_N390.csv.out","w")

#mapas
SEXO={'0':"ignorado",'1':"M",'2':"F"}
RACACOR={'1':"branca",'2':"preta",'3':"amarela",'4':"parda",'5':"indígena"}
ESTCIV={'1':"solteiro",'2':"casado",'3':"viúvo",'4':"sep. judicialmente",'9':"ignorado"}
ESC={'1':"nenhuma",'2':"1-3 anos",'3':"4-7 anos",'4':"8-11 anos",'5':"12+",'9':"ignorado"}

with open('sim_N390.csv') as csv_file:
	csv_reader = csv.reader(csv_file, delimiter=',')
	line_count = 0
	for row in csv_reader:
		if line_count == 0:
			out.write(row[0]+","+row[1]+","+row[2]+","+row[3]+"\n")
			#print(row[0]+","+row[1]+","+row[2]+","+row[3])
			line_count += 1
		else:
			saida=""
			try:
				saida=saida+SEXO[row[0]]
			except:
				saida=saida+("ignorado")
			try:
				saida=saida+","+(RACACOR[row[1]])
			except:
				saida=saida+","+("ignorado")
			try:
				saida=saida+","+(ESTCIV[row[2]])
			except:
				saida=saida+","+("ignorado")
			try:
				saida=saida+","+(ESC[row[3]])
			except:
				saida=saida+","+("ignorado")
			out.write(saida+"\n")
			#print(row)
			#print(saida)
			line_count += 1
out.close()
    