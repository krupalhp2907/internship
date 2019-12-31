import app from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAwiovUCLsjWXMcTdb-3t6cT93rarJogp0",
    authDomain: "first-firebase-learning.firebaseapp.com",
    databaseURL: "https://first-firebase-learning.firebaseio.com",
    projectId: "first-firebase-learning",
    storageBucket: "first-firebase-learning.appspot.com",
    messagingSenderId: "643311198085",
    appId: "1:643311198085:web:850c484c5bd83a384daeec",
    measurementId: "G-S624QJKCZC"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.firestore = app.firestore()
        this.employee = this.firestore.collection("employee")
        this.attendence = this.firestore.collection("attendence")
        this.temp_rfid = this.firestore.collection("temp_rfid")
    }

    getAttendenceRef = () => this.attendence
    getTempRfidRef = () => this.temp_rfid
    getAllAttendences = () => this.attendence.get()
    getReferenceById = (collection, id) => this.firestore.collection(collection).get(id)
    getEmployeeByEmail = (email) => this.employee.where("email", email).get()
    getAttendenceById = (id) => this.attendence.doc(id)
    getAttendenceByEmployeeReference = (refDoc) => this.attendence.where("referenceId", refDoc).get()
    getEmployees = () => this.employee.get()
    getDocumentRef = (document, id) => this.firestore.collection(document).doc(id)
    saveNewEmployee = (validatedData) => {
        this.employee.add(validatedData).then(doc => {
            const newAttn = {}
            newAttn.rfid = validatedData.rfid
            newAttn.attendences = {}
            newAttn.lastEdited = this.getDate()
            console.log(doc.id)
            newAttn.employeeId = this.getDocumentRef("employee", doc.id)
            console.log(newAttn)
            this.attendence.add(newAttn).then(success => {
                alert("Success")
            }).catch(err => {
                this.employee.doc(doc.id).delete().then(success => {
                    alert("Please try again")
                }).catch(err => {
                    this.employee.doc(doc.id).delete().then(success => {
                        alert("Please try again")
                    }).catch(err => {
                        this.employee.doc(doc.id).delete().then(success => {
                            alert("Please try again")
                        }).catch(err => {
                            alert("Some fatal error occoured")
                        })
                    })
                })
            })
        }).catch(err => {
            console.log(err)
            alert("Some error occoured", err.message)
        })
    }

    handleNewEmployee = (employeeReference) => {
        alert("New Employee is in")
    }

    //most important featur
    markAttendenceByEmail = (email) => {
        this.getEmployeeByEmail(email).then(snapshot => {
            if (snapshot.empty) {
                return {
                    err: true,
                    msg: "No such email found"
                }
            }
            var id, employeeDetails
            // This loop will execute single time. I don't know why do we need to do this
            snapshot.forEach(doc => {
                id = doc.id
                employeeDetails = doc.data()
            })
            var employeeReference = this.getDocumentRef("employee", id)
            this.getAttendenceByEmployeeReference(employeeReference).then(snapshot => {
                if (snapshot.empty) {
                    // console.log("First Time login")
                    this.handleNewEmployee(employeeReference)
                } else {
                    // This loop will execute single time. I don't know why do we need to do this
                    var attendenceId, employeeAttendenceData
                    snapshot.forEach(doc => {
                        attendenceId = doc.id
                        employeeAttendenceData = doc.data()
                    })
                    var dateRef = this.getDate()

                    if (employeeAttendenceData.attendences.hasOwnProperty(dateRef)) {
                        employeeAttendenceData.attendences[dateRef].push(new Date())
                    } else {
                        // First Time date scanned
                        employeeAttendenceData.attendences[dateRef] = []
                        employeeAttendenceData.attendences[dateRef].push(new Date())
                    }
                }
            }).catch(err => {
                return {
                    err: true,
                    log: err,
                    msg: "Some unknown error occoured"
                }
            })
        }).catch(err => {
            return {
                err: true,
                log: err,
                msg: "Some unknown error occoured"
            }
        })
    }








    // Helper methods for calculation 

    // check is present in xth date
    checkIsPresent = (obj, d = new Date()) => {
        var date = new Date(String(d))
        var comparableRef = this.getDate(date)
        // console.log(comparableRef)
        if (obj.hasOwnProperty(comparableRef)) {
            return true
        }
        return false
    }

    // check Early arrival of xth date
    checkEarlyArrival = (obj, refHour, d) => {
        var date
        date = new Date()
        if (d) {
            date = d
        }
        var comparableRef = this.getDate(date)
        if (obj.hasOwnProperty(comparableRef)) {
            var firstScanned = new Date(obj[comparableRef][0].seconds * 1000)
            // console.log(obj[comparableRef][0], firstScanned.getHours(), refHour)
            if (firstScanned.getHours() < refHour) {
                return true
            }
        }
        return false
    }
    getDate = (today = new Date()) => {
        today = new Date(String(today))
        var dd = today.getDate();

        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        return yyyy + '-' + mm + '-' + dd;
    }
    fromComparableGetDate = (d) => {
        var date
        date = new Date()
        if (d) {
            date = new Date(d)
        }
        return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
    }

    countTotalSeconds = (arr = [], closingHour = 20) => {
        if (arr.length != 0) {
            var err = (arr.length % 2 === 0 ? false : true)
            var n = arr.length
            var i = 0
            var count = 0
            // var d = new Date()
            // Any one suggest good name
            // This is here because we dont want to include refresh time
            // In our calculation
            // Thus this is here
            // Moreover it wount calculate the same for other days
            // this should be done for present day onyl
            // hope this undestood
            console.log("Before", arr)
            var clear_err = new Date(arr[0].seconds * 1000)
            // console.log(err, this.getDate(), this.getDate(clear_err), "Before ", arr)
            // This clears the error
            // Say odd and today adds refresh timestamps
            // Say even just by pass it
            // Say odd and not today doesnt counts it
            if (err === true) {
                if (this.getDate() === this.getDate(clear_err)) {
                    n = n + 1
                    console.log("Let us take care if thus", app.firestore.Timestamp.fromDate(new Date()))
                    console.log("Let us take care if thus", new Date(app.firestore.Timestamp.fromDate(new Date()).seconds * 1000))
                    arr.push(app.firestore.Timestamp.fromDate(new Date()))
                } else {
                    n = n - 1
                }
            }
            console.log("After", arr)
            for (; i < n; i += 2) {
                count += (arr[i + 1].seconds - arr[i].seconds)
            }
            return Math.abs(count)
        }
        return 0
    }
    isCurrentMonth = (date) => {
        var refDate = new Date(date)
        var todaysDate = new Date()

        return (todaysDate.getMonth() === refDate.getMonth()) && (refDate.getFullYear() === todaysDate.getFullYear())
    }

    getString = (blob) => {
        // const blb = new Blob(["Lorem ipsum sit"], { type: "text/plain" });
        console.log(blob._binaryString)
    }

    isCurrentDate = (date) => {
        var refDate = new Date(date)
        var todaysDate = new Date()

        return (refDate.getDate() === todaysDate.getDate()) && (this.isCurrentMonth(date))
    }
    secondsToTime = (s) => {
        s = Number(s);
        var m = Math.floor(s % 31536000 % 2628288 % 86400 % 3600 / 60);
        var h = Math.floor(s % 31536000 % 2628288 % 86400 / 3600);
        var d = Math.floor(s % 31536000 % 2628288 / 86400);
        var mo = Math.floor(s % 31536000 / 2628288);
        var y = Math.floor(s / 31536000)


        var yDisplay = y > 0 ? y + " Y " : ""
        var moDisplay = mo > 0 ? mo + " M " : ""
        var dDisplay = d > 0 ? d + " D " : ""
        var hDisplay = h > 0 ? h + " H " : ""
        var mDisplay = m > 0 ? m + " Min " : ""

        return yDisplay + moDisplay + dDisplay + hDisplay + mDisplay;
    }
    secondsToHours = (s) => {
        return Math.floor(s % 31536000 % 2628288 % 86400 / 3600);
    }

    checkIsBetween = (dateFrom, dateTo, dateCheck) => {
        var d1 = dateFrom.split("-");
        var d2 = dateTo.split("-");
        var c = dateCheck.split("-");

        var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);  // -1 because months are from 0 to 11
        var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
        var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

        console.log(check > from && check < to)
        return (check > from && check < to)
    }

    getDateSpend = (date1, date2) => {
        date1 = new Date(String(date1))
        date2 = new Date(String(date2))
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays);
        return diffDays
    }

    getRangeOfGraphs = (initial) => {
        var todayTimestamp = new Date()
        var totalDays = this.getDateSpend(initial, todayTimestamp)
        if (totalDays <= 7) {
            return (this.getDate(initial), this.getDate(todayTimestamp))
        } else if (7 < totalDays <= 30) {
            return
        }

    }
}
export default Firebase;