# import json

# api_data = json.loads(open("API_data.json").read())

# aadhar = 12350

# for i in range(len(api_data)):
#     if api_data[i]["student_id"]==aadhar:
#        val = list(api_data[i].values())
#        print(val[1:])
import datetime
today = datetime.datetime.now()
formatted_date = today.strftime("%d/%m/%Y")
print(formatted_date)