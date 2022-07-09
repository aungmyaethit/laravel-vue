<?php

use App\Models\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class);
            $table->string('name' , 1000);
            $table->decimal('latitude' , 8 , 6);
            $table->decimal('longitude' , 9 , 6);
            $table->string('address')->nullable();
            $table->string('hour')->nullable();
            $table->text('note')->nullable();
            $table->string('tag')->nullable();
            $table->string('slug')->nullable();
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
        Schema::dropIfExists('shops');
    }
}
