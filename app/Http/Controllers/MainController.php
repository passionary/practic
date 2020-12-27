<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Author;
use App\Models\House;

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
                    $items[] = $this->getBook($row);
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

    public function getBook($row)
    {
        return [
            'id' => $row->id,
            'name' => $row->name,
            'price' => $row->price,
            'author' => $row->author->name,
            'house' => $row->house->name
        ];
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
                    'name' => $item->name,
                    'author' => $item->author->name ?? '',
                    'house' => $item->house->name ?? ''
                ];
            break;
            case 'authors':
                $item = Author::create([
                    'name' => $request->input('name'),
                    'contact' => $request->input('contact'),
                    'email' => $request->input('email')
                ]);

                $item = [
                    'name' => $item->name,
                    'contact' => $item->contact,
                    'email' => $item->email ?? ''
                ];
            break;
            case 'houses':
                $item = House::create([
                    'name' => $request->input('name')
                ]);

                $item = [
                    'name' => $item->name
                ];
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
                $item = Book::find($request->input('id'));
                foreach($request->all() as $key => $val) {
                    if(in_array($key, ['name', 'price', 'author_id', 'house_id'])) {
                        $item[$key] = $val;
                        $item->save();
                    };
                }
            break;
            case 'authors':
                $item = Author::create([
                    'name' => $request->input('name'),
                    'contact' => $request->input('contact'),
                    'email' => $request->input('email')
                ]);

                $item = [
                    'name' => $item->name,
                    'contact' => $item->contact,
                    'email' => $item->email ?? ''
                ];
            break;
            case 'houses':
                $item = House::create([
                    'name' => $request->input('name')
                ]);

                $item = [
                    'name' => $item->name
                ];
            break;
        }

        return response()->json([
            'item' => $this->getBook(Book::find($item->id))
        ]);
    }

    public function delete(Request $request)
    {
        $table = $request->input('table');

        switch($table) {
            case 'books':                
                Book::where('id', $request->input('id'))->delete();
            break;
            case 'authors':
                Author::where('id', $request->input('id'))->delete();
            break;
            case 'houses':
                House::where('id', $request->input('id'))->delete();
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
}
