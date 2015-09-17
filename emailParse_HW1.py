#!/usr/bin/env python

import feedparser		# imports feedparser to parse XML feed
import smtplib
import time

user='ohw979@newschool.edu'		# replace *** with your personal gmail user, or youruser@newschool.edu for your school account
passwd=''		# replace *** with your password for the above account
fromaddr = 'ohw979@newschool.edu'
toaddrs  = 'ohw979@newschool.edu'

newmails = feedparser.parse("https://" + user + ":" + passwd + "@mail.google.com/gmail/feed/atom").entries

def report(something):
    for i in newmails:
        # print i
        if str(i.title) == something:
            print "your email titled " + str(i.title) + " has a summary of " + i.summary
    return i.summary


while True: 	#loop forever ---- to exit use keys "ctr+c"
    title = raw_input("What is the title of the email? ")
    result = report(title)
    subjectemail = 'New email: ' + str(title)
    contentofEmail = str(result)
    message = 'Subject: %s\n%s' % (subjectemail, contentofEmail)
    print message
    smtpserver = smtplib.SMTP('smtp.gmail.com', 587)
    # smtpserver.ehlo()
    smtpserver.starttls()
    # smtpserver.ehlo
    smtpserver.login(user, passwd)
    smtpserver.sendmail(fromaddr, toaddrs, message)
    smtpserver.quit()
    time.sleep(5)   

