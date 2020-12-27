<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('price');
            $table->unsignedBigInteger('author_id')->nullable();
            $table->unsignedBigInteger('house_id')->nullable();
            $table->foreign('author_id')->references('id')->on('authors')->onDelete('set null');
            $table->foreign('house_id')->references('id')->on('houses')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
}
