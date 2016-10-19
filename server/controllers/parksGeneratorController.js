module.exports = function (app, route) {
  var Parks = app.models.park;
  return {
    "handler": function (req, res) {

      var parks = [
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 1
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 2
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 3
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 4
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 5
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 6
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 7
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 8
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 9
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 10
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 11
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 12
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 13
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 14
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 15
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 16
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 17
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 18
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 19
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 20
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 21
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 22
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 23
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 24
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 25
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 26
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 27
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 28
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 29
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 30
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 31
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 32
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 33
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 34
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 35
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 36
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 37
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 38
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 39
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 40
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 41
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 42
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 43
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 44
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 45
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 46
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 47
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 48
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 49
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 50
          }
        },
        {
          "allocations": [],
          "_id": {
            "locations": "Bisceglie",
            "parkNumber": 51
          }
        }
      ];

      Parks.collection.insert(parks, onInsert);

      function onInsert(err, docs) {
        if (err) {
          // TODO: handle error
        } else {
          console.info('%d parks were successfully stored.', docs.length);
        }
      }
    },
    "method": "get"
  }
};
