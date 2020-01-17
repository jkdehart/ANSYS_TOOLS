import csv
import glob

def get_site_files():
    with open('out.dat', 'w') as out_file:
        csv_out = csv.writer(out_file, delimiter=',')
        for fname in glob.glob('*.csv'):
            with open(fname) as f:
                for line in f:
                    vals = line.split(',')
                    csv_out.writerow(vals)

get_site_files()
