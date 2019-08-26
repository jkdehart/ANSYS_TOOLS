from tkinter import *

master = Tk()
Label(master, text="Grid Size X").grid(row=0)
Label(master, text="Grid Size Y").grid(row=1)
Label(master, text="Panel Length X").grid(row=2)
Label(master, text="Panel Length Y").grid(row=3)

e1 = Entry(master)
e2 = Entry(master)
e3 = Entry(master)
e4 = Entry(master)

e1.insert(10,"4")
e2.insert(10,"4")
e3.insert(10,"20")
e4.insert(10,"20")


e1.grid(row=0, column=1)
e2.grid(row=1, column=1)
e3.grid(row=2, column=1)
e4.grid(row=3, column=1)

Button(master, text='Quit', command=master.quit).grid(row=4, column=0, sticky=W, pady=4)
Button(master, text='Run', command=show_entry_fields).grid(row=4, column=1, sticky=W, pady=4)

mainloop( )
