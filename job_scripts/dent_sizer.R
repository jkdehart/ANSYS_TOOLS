## Dent Diamter and Gap Separation Estimation Tool
## Writen: J.K. DeHart
## Date: 11/05/18
#################################################################
## Description:
##
## This tool will read the defined dent profile data from Ansys
## and calulate each dent diamter and the sepration between the 
## dents based on user defined the user dent criteria of dent slope
## angle in degrees.
##
#################################################################
## Usage:
##
## User defines: 
##    ds_threshhold: 'Dent Slope threashold' [angular deg]
##    bucket_id: Bucket ID e.g. '01d'
##    indenter_dia: The diamter of the Indeter used
##    indetner_depth: The remote displamcnet of the indenter
##
#################################################################
## Revisions:
##
## A - 11/7/2018[JKD]: Added angular calc (lines 65,67 of rev -)
##
#################################################################
## Notes:
## 
#################################################################
## TODO:
##
##    Add Dg: Dent gap requirment [in]
##    Add Dgt: Dent gap tolerance [in]
##    DONE --> Rev A [Add angular constraint instead of point to point]
##
#################################################################

## Begin

# Load libraies
library(quantmod)
library(readr)

# Set requirments
ds_threshhold <- 10
bucket_id <- "01D"
indenter_dia <- "1"
indetner_depth <- "0.15625"
Dg <- 3
Dgt <- .1

# Read dent data into data frame
X01D_P1.dat <- read_table2("~working/dent_data/01D_P1.txt", col_names = FALSE)
#plot(X01D_P1.dat, type ="l")

# Scale and center about 0
adj.x <- max(X01D_P1.dat[1])/2
centered.x <- X01D_P1.dat[1] - adj.x
dat.scaled <- as.data.frame(cbind(centered.x, X01D_P1.dat[2]))
#plot(dat.scaled, type="l")
#plot(rownames(dat.scaled),dat.scaled$X2)

# Calculate the dent wall slope - point to point
dat.slope.y <- as.data.frame(diff(dat.scaled$X2) / diff(dat.scaled$X1))
# Calculate slope as angle in degrees (angle = -tan(dy/dx)[radians])
dat.slope.y.angle.deg <- atan(as.data.frame(diff(dat.scaled$X2) / diff(dat.scaled$X1))) * (180/pi)
dat.slope.x <- as.data.frame(index(dat.slope.y))
dat.slope <- as.data.frame(cbind(dat.slope.x,dat.slope.y.angle.deg))
#plot(dat.slope, type="l")

# Extract data into vectors
# each 50 points will represent a side of the dent
# each data set will be rotated into the same cs and
# slopes will be asses in same system
dat.slope.a_vec <- as.numeric(dat.slope[1:50,2])
dat.slope.b_vec <- as.numeric(dat.slope[51:100,2])
dat.slope.c_vec <- as.numeric(dat.slope[101:150,2])
dat.slope.d_vec <- as.numeric(dat.slope[151:200,2])

# Plot rotated slopes for review
#plot(dat.slope.a_vec, type="l", col="red")
#lines(dat.slope.b_vec, col="blue")
#lines(dat.slope.c_vec, col="green")
#lines(dat.slope.d_vec, col="purple")

# Extract index of liminting slope for each data set
# Slope identifier = first negative threshold
dat.slope.a_vec.index <- min(which(dat.slope.a_vec < -ds_threshhold))
dat.slope.b_vec.index <- max(which(dat.slope.b_vec > ds_threshhold)) + 50
dat.slope.c_vec.index <- min(which(dat.slope.c_vec < -ds_threshhold)) + 100
dat.slope.d_vec.index <- max(which(dat.slope.d_vec > ds_threshhold)) + 150

# Pull dimesional values from the depth data
dat.slope.a.dist <- dat.scaled[dat.slope.a_vec.index, 1]
dat.slope.b.dist <- dat.scaled[dat.slope.b_vec.index, 1]
dat.slope.c.dist <- dat.scaled[dat.slope.c_vec.index, 1]
dat.slope.d.dist <- dat.scaled[dat.slope.d_vec.index, 1]

# plot lines
plot(dat.scaled, 
     main="C5 Panel - Dent diameter and separation",
     xlab = "Dent Separation Distance [in]",
     ylab = "Dent Depth [in]")#,
     #sub = "Bucket = 01D, Indenter Diameter = 1, Depth = .15625")
mtext(paste0("Bucket = ", bucket_id,
             ", Indenter Dia = ", indenter_dia, '"',
             ", Depth =", indetner_depth, '"',
             ", Threashold = ", ds_threshhold, " deg"))
abline(v=dat.slope.a.dist, col="red", lty=3)
abline(v=dat.slope.b.dist, col="red", lty=3)
abline(v=dat.slope.c.dist, col="red", lty=3)
abline(v=dat.slope.d.dist, col="red", lty=3)

# Calulate dent diamters and gap width
dia_1 <- abs(dat.slope.a.dist - dat.slope.b.dist)
dia_2 <- abs(dat.slope.c.dist - dat.slope.d.dist)
d_gap <- abs(dat.slope.b.dist - dat.slope.c.dist)

# Update plot with data
text((dat.slope.a.dist + dat.slope.b.dist)/2, -.01, paste("Dent 1 = ", as.character(round(dia_1, 3))))
text((dat.slope.c.dist + dat.slope.d.dist)/2, -.01, paste("Dent 2 = ", as.character(round(dia_2, 3))))
text((dat.slope.b.dist + dat.slope.c.dist)/2, -.05, paste("Separation = ", as.character(round(d_gap, 3))))

# end
