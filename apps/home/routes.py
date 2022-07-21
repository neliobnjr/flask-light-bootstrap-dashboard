# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from apps.home import blueprint
from flask import render_template, request, jsonify
from flask_login import login_required
from jinja2 import TemplateNotFound
import requests
import json
from apps.marker_gen import *

@blueprint.route('/index')
@login_required
def index():

    return render_template('home/index.html', segment='index')


@blueprint.route('/<template>')
@login_required
def route_template(template):

    try:
        if not template.endswith('.html'):
            template += '.html'
        try:
            info = request.args.get('q')
        except:
            info = ['none']
        # if template == "dash.html":
        #     info = request.args.get("q")
        #     segment = get_segment(request)
        #     return render_template("home/" + template, segment=segment,info=info)
        # Detect the current page
        segment = get_segment(request)
        pagename = template
        # Serve the file (if exists) from app/templates/home/FILE.html
        return render_template("home/" + template, segment=segment,info=info,pagename=pagename)

    except TemplateNotFound:
        return render_template('home/page-404.html'), 404

    except:
        return render_template('home/page-500.html'), 500

@blueprint.route('/get_data')
@login_required
def getdata():
    try:
        headers = {"api-key":"f54a7b5a-8851-409d-b941-71a9d11ce217"}
        req = requests.get('http://ec2-18-231-123-151.sa-east-1.compute.amazonaws.com/unithealthcheck', headers=headers)
        data1 = req.json()
        if "coordinates" not in data1:
            data1['coordinates']= {"lat":37.4530626,
            "lng": -122.0776532}
        else:
            coordinates = data1['coordinates']
            coordinates = coordinates.split('\n')
            coordinates = coordinates[3].split(' ')
            coordinates[1] = coordinates[1].replace("\r","")
            data1['coordinates'] = coordinates
        ## Webhooks integration
        # headers = {"api-key":"f54a7b5a-8851-409d-b941-71a9d11ce217"}
        # req = requests.get('https://webhook.site/token/f54a7b5a-8851-409d-b941-71a9d11ce217/requests?sorting=newest', headers=headers)
        # data1 = req.json()
        # data = data1["data"][0]["content"]
        # time = data1["data"][0]["created_at"]
        return jsonify(data1)
    except:
        data = {"error":"error"
            
        }
        return jsonify(data)

@blueprint.route('/getmarkers')
@login_required
def getMarkers():
    try:
        a = exportMarkers()
        result = {'result':a}
        return result
    except:
        a = ["alert('SERVER ERROR')"]
        result = {"result"}

# @blueprint.route('/dash')
# @login_required
# def unitDash():
#     info = request.args.get('q')
#     return f'{info} here.'
    


# Helper - Extract current page name from request
def get_segment(request):

    try:

        segment = request.path.split('/')[-1]

        if segment == '':
            segment = 'index'

        return segment

    except:
        return None
