<?php
include '../core/db.php';
class news extends db{
    public function index(){
        include '../views/admin/admin.html';
    }
}