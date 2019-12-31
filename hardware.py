print("Setting up things....")
import serial 
import firebase_admin imo
from firebase_admin import credentials
from firebase_admin import firestore 
from datetime import datetime
import time
import traceback
print("Dependencies ported")
def read_rfid():
   ser = serial.Serial ("/dev/ttyS1")   
   ser.baudrate = 9600
   data = ser.read(12)
   ser.close ()
   return data
def on_change(doc_snapshot, changes, read_time):
    print("Siooooooooo")
    for doc in doc_snapshot:
        print(u"Received document snapshot: {}".format(doc.id))
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'projectId' : "first-firebase-learning", 
})
db = firestore.client()
class TestWatchInfo():
  def __init__(self):
    self.start_snapshot()
  def start_snapshot(self):
    self.query_watch = db.collection(u'temp_rfid').document("store_rfid_temp_id").on_snapshot(self.on_snapshot)
  def on_snapshot(self, col_snapshot, changes, read_time):
    print("chnaaa")
    try:
        for doc in col_snapshot:
            rfid_request = doc.to_dict()[u'rfid_request']
            if rfid_request == True:
                print("Scan rfid")  
                id = read_rfid()
                print(id) 
                temp_rfid_ref.set({
                    "rfid": id,
                    "init_time": datetime.now(),
                    "rfid_request": False
                })
                print("Store rfid")
            else:
                print("Ignore all changes")

        for change in changes:
            pass
    except Exception as err:
      print(err)
      print("Error occurred at " + str(time.ctime()))
      traceback.print_exc()
if __name__ == '__main__':
  try:
    test_object = TestWatchInfo()
    while(True):
      if test_object.query_watch._closed:
        test_object.start_snapshot()
    #   test_object.on_snapshot(on_change)
  except Exception as err:
    print(err)
    print("Error occurred at " + str(time.ctime()))
    traceback.print_exc()