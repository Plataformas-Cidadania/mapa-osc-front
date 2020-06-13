@extends('layout')
@section('content')

    <script>
        maxAddresses = 10;
        maxCertificates = 200;
        maxGovernancas = 200;
    </script>

    <div id="header"></div>
    <br><br>
    <div class="container">
        <div id="header-user"></div>
        <div class="row">
            <div class="col-md-3">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div id="menu"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div id={{$pgUserArea}}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br><br>
    <div id="footer"></div>
@endsection
