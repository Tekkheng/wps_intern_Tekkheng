<?php

namespace App\Http\Controllers;

use App\Models\DailyLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DailyLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $conn = DailyLog::with('userData')->get();
        return response($conn, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $req)
    {
        try {
            $validasi = Validator::make(
                $req->all(),
                [
                    'log' => 'required|string|max:255',
                    'status' => 'nullable|in:Pending,Approved,Rejected',
                    'user_id' => 'required|exists:users,id',
                    'date' => 'required|string|max:255',
                ],
            );
            if ($validasi->fails()) {
                return response()->json($validasi->errors(), 422);
            }

            $data = new DailyLog();
            $data->log = $req->log;
            $status = $req->status ?? 'Pending';
            $data->status = $status;
            $data->user_id = $req->user_id;
            $data->date = $req->date;
            $data->save();

            $response = [
                'status' => 200,
                'message' => 'success add new data',
                'data' => $data,
            ];
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $response = ['status' => 500, 'message' => $th->getMessage()];
            return response()->json($response, 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            // $conn = DB::connection('mysql')->table('master_truck')->find($id);
            $conn = DailyLog::find($id);
            if ($conn == NULL) {
                return response()->json("data pada id=$id, tidak ada!", 404);
            } else {
                return response()->json($conn, 200);
            }
        } catch (\Throwable $th) {
            $res = ['status' => 500, 'message' => $th->getMessage()];
            return response()->json($res, 500);
        }
    }

    public function update(Request $req, $id)
    {
        try {
            $validasi = Validator::make(
                $req->all(),
                [
                    'log' => 'required|string|max:255',
                    'status' => 'nullable|in:Pending,Approved,Rejected',
                    'user_id' => 'required|exists:users,id',
                    'date' => 'required|string|max:255',
                ],
            );
            if ($validasi->fails()) {
                return response()->json($validasi->errors(), 422);
            }
            $data = DailyLog::find($id);
            if ($data == null) {
                return response()->json("data pada id=$id tidak ada!", 404);
            }

            $timestamp = Carbon::now()->toDateTimeString();
            $data->log = $req->log;
            $data->user_id = $req->user_id;
            $data->status = $req->status;
            $data->date = $req->date;
            $data['updated_at'] = $timestamp;
            $data->save();
            $response = [
                'status' => 200,
                'message' => 'success update data',
                'data' => $data,
            ];
            return response()->json($response, 200);
        } catch (\Throwable $th) {
            $res = ['status' => 500, 'message' => $th->getMessage()];
            return response()->json($res, 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $conn = DailyLog::find($id);
            if ($conn == null) {
                return response()->json("data pada id=$id, tidak ada!", 404);
            } else {
                $conn->delete();
                return response()->json("data pada id=$id, berhasil di hapus!", 200);
            }
        } catch (\Throwable $th) {
            $res = ['status' => 500, 'message' => $th->getMessage()];
            return response()->json($res, 500);
        }
    }

    public function updateStatus(Request $req, $id)
    {
        try {
            $validasi = Validator::make(
                $req->all(),
                [
                    'status' => 'nullable|in:Pending,Approved,Rejected',
                ],
            );
            if ($validasi->fails()) {
                $res = [
                    'success' => false,
                    'status' => 422,
                    'message' => $validasi->errors(),
                ];
                return response()->json($res, 422);
            }
            $data = DailyLog::find($id);

            // Periksa apakah data ditemukan
            if (!$data) {
                return response()->json(['message' => 'DailyLog not found'], 404);
            }

            // Update nilai status
            $data->status = $req->status;

            $data->save();
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            $response = ['status' => 500, 'message' => $th->getMessage()];
            return response()->json($response, 500);
        }
    }
}
