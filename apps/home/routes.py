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

        # Detect the current page
        segment = get_segment(request)

        # Serve the file (if exists) from app/templates/home/FILE.html
        return render_template("home/" + template, segment=segment)

    except TemplateNotFound:
        return render_template('home/page-404.html'), 404

    except:
        return render_template('home/page-500.html'), 500

@blueprint.route('/get_data')
@login_required
def getdata():
    headers = {"api-key":"f54a7b5a-8851-409d-b941-71a9d11ce217"}
    req = requests.get('https://webhook.site/token/f54a7b5a-8851-409d-b941-71a9d11ce217/requests?sorting=newest', headers=headers)
    data1 = req.json()
    data = data1["data"][0]["content"]
    time = data1["data"][0]["created_at"]
    data = json.loads(data)
    return jsonify(data)

# Helper - Extract current page name from request
def get_segment(request):

    try:

        segment = request.path.split('/')[-1]

        if segment == '':
            segment = 'index'

        return segment

    except:
        return None
