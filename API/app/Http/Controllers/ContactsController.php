<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Contacts;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ContactsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user_id = auth('sanctum')->user()->id;
        return Contacts::select('*')->where('user_id', $user_id)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $request->validate([
            'contactName' => 'required',
            'telephone' => 'required',
        ]);
        $user = $request->all();
        $user['user_id']  = auth('sanctum')->user()->id;
        return Contacts::create($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $contact = Contacts::find($id);
        if(is_null($contact))
            return Response([
                'message' => "There is no such contact in ur list"
            ],400);
        if ($contact->user_id === auth('sanctum')->user()->id) {
            return $contact;
        }
        else{
            return Response([
                'message' => "You are not allowed to read info of this contact"
            ],401);
        }
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $contact = Contacts::find($id);
        if ($contact->user_id === auth('sanctum')->user()->id) {
            $contact->update($request->all());
            return $contact;
        }
        else{
            return Response([
                'message' => "You are not allowed to edit this contact"
            ],401);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $contact = Contacts::find($id);
        if ($contact->user_id === auth('sanctum')->user()->id) {
            return Contacts::destroy($id);
        }
        else{
            return Response([
                'message' => "You are not allowed to delete this contact"
            ],401);
        }
    }

}
