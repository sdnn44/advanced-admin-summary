<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Http\Requests\StoreAdminRequest;
use App\Http\Requests\UpdateAdminRequest;
use App\Http\Resources\AdminResource;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AdminResource::collection(
            Admin::query()->orderBy('name', 'desc')->paginate(20)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAdminRequest $request)
    {
        $data = $request->validated();
        $admin = Admin::create($data);
        return response(new AdminResource($admin), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        return new AdminResource($admin);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdminRequest $request, Admin $admin)
    {
        $data = $request->validated();
        $admin->update($data);

        return new AdminResource($admin);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        $admin->delete();
        return response("", 204);
    }
}
