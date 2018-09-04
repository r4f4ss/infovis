import csv

i_dtobito=5

#arquivo de saida
out=open("DORJ2015.csv.out","w")

with open('DORJ2015.csv') as csv_file:
	csv_reader = csv.reader(csv_file, delimiter=',')
	line_count = 0
	for row in csv_reader:
		if line_count == 0:
			for i in range(len(row)):
				out.write(row[i]+",")
			out.write("QUARTOANO\n")
			line_count += 1
		else:

			try:
				data=row[i_dtobito]
				mes=data[2:4]
				mes=int(mes)
				ano=data[4:]

				if(mes<=3):
					quarto="Q1"
				elif(mes<=6):
					quarto="Q2"
				elif(mes<=9):
					quarto="Q3"
				else:
					quarto="Q4"

				quartoano=ano+"-"+quarto
			except:
				pass
			else:
				for i in range(len(row)):
					out.write(row[i]+",")
				out.write(quartoano+"\n")
			line_count += 1
out.close()
