with open('SXT.csv') as infile, open('results.dat', 'wt') as outfile:
    for line in infile:
        if not line.strip(): continue  # skip the empty line
        outfile.write(line)  # non-empty line. Write it to output
