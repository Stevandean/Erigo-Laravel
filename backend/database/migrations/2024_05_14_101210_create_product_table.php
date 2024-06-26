<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product', function (Blueprint $table) {
            $table->bigIncrements('product_id');
            $table->string('product_name');
            $table->integer('price');
            $table->text('desc');
            $table->string('size');
            $table->integer('stock');
            $table->text('pict');
            $table->integer('rating');
            $table->unsignedBigInteger('categories_id');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('categories_id')->references('categories_id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
