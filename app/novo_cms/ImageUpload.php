<?php

namespace App;

use Illuminate\Http\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;


class ImageUpload
{

    public function inserir($file, $path, $filename, $sizes, $widthOriginal)
    {

        //Log::info($file->guessExtension());

        foreach($sizes as $prefixo => $size){
            $image = Image::make($file->getRealPath())->resize($size['width'], $size['height'], function ($constraint) {
                $constraint->aspectRatio();

                //$constraint->upsize();
            })->encode($file->guessExtension());
            Storage::put($path."/".$prefixo."-".$filename, $image->__toString());
        }

        $success = true;
        if($widthOriginal){
            $success = Storage::putFileAs($path, $file, $filename);
            //$success = $file->move($path, $filename);
        }

        return $success;
    }


    public function alterar($file, $path, $filename, $sizes, $widthOriginal, $registro)
    {
        foreach($sizes as $prefixo => $size){
            if(file_exists($path."/".$prefixo."-".$registro->imagem)){
                unlink($path."/".$prefixo."-".$registro->imagem);
            }
            Image::make($file->getRealPath())->resize($size['width'], $size['height'], function ($constraint) {
                $constraint->aspectRatio();
            })->save($path."/".$prefixo."-".$filename);
        }

        $success = false;
        if($widthOriginal){
            $success = $file->move($path, $filename);
        }

        if($success) {
            if (!empty($registro->imagem)) {
                if (file_exists($path . "/" . $registro->imagem)) {
                    unlink($path . "/" . $registro->imagem);
                }
            }
        }

        return $success;
    }

    public function excluir($path, $sizes, $registro)
    {

        if(property_exists($registro, 'image')){
            if(!empty($registro->imagem)){
                foreach($sizes as $prefixo => $size){
                    //Log::info($path."/".$prefixo."-".$registro->image);
                    if(Storage::exists($path."/".$prefixo."-".$registro->imagem)){
                        Storage::delete($path."/".$prefixo."-".$registro->imagem);
                    }
                }

                if(Storage::exists($path."/".$registro->imagem)) {
                    Storage::delete($path . "/" . $registro->imagem);
                }
            }
        }

    }


}
