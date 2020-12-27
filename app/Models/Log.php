<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    protected $fillable = [
        'table', 'action'
    ];

    public static function getLogsByTable($table)
    {
        $rows = self::where('table', $table)->get();

        $action_messages = [
            'created' => 'Создание записи',
            'updated' => 'Обновление записи',
            'deleted' => 'Удаление записи'
        ];

        $items = [];

        foreach($rows as $row) {
            $items[] = [
                'action' => $action_messages[$row->action]
            ];
        }

        return $items;
    }
}
