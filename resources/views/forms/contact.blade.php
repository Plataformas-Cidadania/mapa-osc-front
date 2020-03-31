@extends('layout')
@section('title', '')
@section('keywords', '')
@section('description', '')
@section('image', '')
@section('content')

    {{--<script>
        email = "relison@cd10.com.br";
    </script>--}}

    <style>
        .label-float{
            position: relative;
            padding-top: 5px;
        }

        .label-float input{
            border: 1px solid lightgrey;
            border-radius: 5px;
            outline: none;
            min-width: 250px;
            padding: 5px 20px;
            font-size: 16px;
            transition: all .1s linear;
            -webkit-transition: all .1s linear;
            -moz-transition: all .1s linear;
            -webkit-appearance:none;
        }

        .label-float input:focus{
            border: 2px solid #1A73E8;
        }

        .label-float input::placeholder{
            color:transparent;
        }

        .label-float label{
            pointer-events: none;
            position: absolute;
            top: calc(50% - 28px);
            left: 20px;
            transition: all .1s linear;
            -webkit-transition: all .1s linear;
            -moz-transition: all .1s linear;
            background-color: white;
            padding: 5px;
            box-sizing: border-box;
            font-size: 14px;
            color: #AAAAAA;
        }

        .label-float input:required:invalid {
            border: 2px solid #D93025;
        }
        .label-float input:required:invalid + label{
            color: #D93025;
        }
        .label-float input:focus:required:invalid{
            border: 2px solid #D93025;
        }
        .label-float input:required:invalid + label:before{
            content: '*';
        }
        .label-float input:focus + label,
        .label-float input:not(:placeholder-shown) + label{
            font-size: 12px;
            top: -18px;
            color: #1A73E8;
        }
        .label-box-info{
            height: 20px;
            margin-bottom: 10px;
        }
        .label-float p{
            color: #D93025;
            font-size: 12px;
            margin: 2px;
            padding: 0;
        }

        input:focus, textarea:focus {

            outline: none!important;

        }
    </style>
    <div id="contact"></div>
@endsection
