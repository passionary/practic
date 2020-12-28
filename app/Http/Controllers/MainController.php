<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Author;
use App\Models\House;
use App\Models\Log;

class MainController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function read(Request $request)
    {
        $table = $request->input('table');        
        $header = [];        
        $items = [];
        $response = [];

        switch($table) {
            case 'books':
                $header = ['№', 'Имя', 'Цена', 'Автор', 'Издательство'];
                $rows = Book::all();

                foreach($rows as $row) {
                    $items[] = $this->getItem($row, 'book');
                }
            break;
            case 'authors':
                $header = ['№', 'Имя', 'Контакты', 'Почта'];
                $rows = Author::all();
                
                foreach($rows as $row) {
                    $items[] = [
                        'id' => $row->id,
                        'name' => $row->name,
                        'contact' => $row->contact,
                        'email' => $row->email
                    ];
                }
            break;
            case 'houses':
                $header = ['№', 'Имя'];
                $rows = House::all();

                foreach($rows as $row) {
                    $items[] = [
                        'id' => $row->id,
                        'name' => $row->name
                    ];
                }
            break;
        }

        $response['header'] = $header;
        $response['data'] = $items;

        return response()->json($response);
    }

    public function getItem($row, $item)
    {
        if($item == 'book') {
            return [
                'id' => $row->id,
                'name' => $row->name,
                'price' => $row->price,
                'author' => $row->author->name ?? '',
                'house' => $row->house->name ?? ''
            ];   
        }
        else if($item == 'author') {
            return [
                'id' => $row->id,
                'name' => $row->name,
                'contact' => $row->contact,
                'email' => $row->email,                
            ];
        }
        else if($item == 'house') {
            return [
                'id' => $row->id,
                'name' => $row->name
            ];
        }
    }

    public function create(Request $request)
    {
        $table = $request->input('table');

        switch($table) {
            case 'books':
                $item = Book::create([
                    'name' => $request->input('name'),
                    'price' => $request->input('price'),
                    'author_id' => $request->input('author_id'),
                    'house_id' => $request->input('house_id')
                ]);

                $item = [
                    'id' => $item->id,
                    'name' => $item->name,
                    'author' => $item->author->name ?? '',
                    'house' => $item->house->name ?? ''
                ];

                Log::create([
                    'table' => 'books',
                    'action' => 'created'
                ]);
            break;
            case 'authors':
                $item = Author::create([
                    'name' => $request->input('name'),
                    'contact' => $request->input('contact'),
                    'email' => $request->input('email')
                ]);

                $item = [
                    'id' => $item->id,
                    'name' => $item->name,
                    'contact' => $item->contact,
                    'email' => $item->email ?? ''
                ];

                Log::create([
                    'table' => 'authors',
                    'action' => 'created'
                ]);
            break;
            case 'houses':
                $item = House::create([
                    'name' => $request->input('name')
                ]);

                $item = [
                    'id' => $item->id,
                    'name' => $item->name
                ];

                Log::create([
                    'table' => 'houses',
                    'action' => 'created'
                ]);
            break;
        }

        return response()->json([
            'item' => $item
        ]);
    }

    public function update(Request $request)
    {        
        $table = $request->input('table');

        switch($table) {
            case 'books':
                $field = 'book';
                $item = Book::find($request->input('id'));

                foreach($request->all() as $key => $val) {
                    if(in_array($key, ['name', 'price', 'author_id', 'house_id'])) {
                        $item[$key] = $val;
                        $item->save();
                    };
                }

                $item = Book::find($item->id);

                Log::create([
                    'table' => 'books',
                    'action' => 'updated'
                ]);
            break;
            case 'authors':
                $field = 'author';
                $item = Author::find($request->input('id'));

                foreach($request->all() as $key => $val) {
                    if(in_array($key, ['name', 'contact', 'email'])) {
                        $item[$key] = $val;
                        $item->save();
                    };
                }

                $item = Author::find($item->id);

                Log::create([
                    'table' => 'authors',
                    'action' => 'updated'
                ]);
            break;
            case 'houses':
                $field = 'house';
                $item = House::find($request->input('id'));

                foreach($request->all() as $key => $val) {
                    if(in_array($key, ['name'])) {
                        $item[$key] = $val;
                        $item->save();
                    };
                }

                $item = House::find($item->id);

                Log::create([
                    'table' => 'houses',
                    'action' => 'updated'
                ]);
            break;
        }

        return response()->json([
            'item' => $this->getItem($item, $field)
        ]);
    }

    public function delete(Request $request)
    {
        $table = $request->input('table');

        switch($table) {
            case 'books':                
                Book::where('id', $request->input('id'))->delete();

                Log::create([
                    'table' => 'books',
                    'action' => 'deleted'
                ]);
            break;
            case 'authors':
                Author::where('id', $request->input('id'))->delete();

                Log::create([
                    'table' => 'authors',
                    'action' => 'deleted'
                ]);
            break;
            case 'houses':
                House::where('id', $request->input('id'))->delete();

                Log::create([
                    'table' => 'houses',
                    'action' => 'deleted'
                ]);
            break;
        }

        return response()->json([
            'message' => 'Элемент успешно удален!'
        ]);
    }

    public function getOptions(Request $request)
    {
        $authors = Author::all();
        $houses = House::all();
        $author_items = [];
        $house_items = [];

        foreach($authors as $author) {
            $author_items[] = [
                'value' => $author->id,
                'text' => $author->name
            ];
        }

        $items = [];

        foreach($houses as $house) {
            $house_items[] = [
                'value' => $house->id,
                'text' => $house->name
            ];
        }

        return response()->json([
            'authors' => $author_items,
            'houses' => $house_items
        ]);
    }    

    public function logs(Request $request)
    {
        return Log::getLogsByTable($request->input('table'));
    }
}
