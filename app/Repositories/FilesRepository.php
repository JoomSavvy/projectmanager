<?php

namespace App\Repositories;

use App\Models\Files;
use InfyOm\Generator\Common\BaseRepository;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class FilesRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Files::class;
    }

    public function create(array $input){

        /** @var \Illuminate\Http\UploadedFile $file */
        $file = $input['fileData'];
        $input['hash'] = $file->hashName();
        $input['filename'] = $file->getClientOriginalName();

        Storage::disk('local')->put('documents/'.$input['hash'],  File::get($file));
        return parent::create($input);
    }

    public function download($id){
        /** @var Files $files */
        $entry = $this->find($id);

        if(!empty($entry)){
            $file['filename'] = $entry->filename;//.'.'.File::extension(storage_path().'/app/documents/'.$entry->hash);
            $file['path'] = storage_path().'/app/documents/'.$entry->hash;
            $file['mimetype'] = Storage::disk('local')->mimeType('documents/'.$entry->hash);
            return $file;
        }else{
            return false;
        }
    }
}
