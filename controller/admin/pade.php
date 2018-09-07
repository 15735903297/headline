<?php
include '../core/db.php';
class pade extends db
{
    const PER_PAGE = 10;

    public function delete()
    {
        $count = $this->pdo
            ->exec("delete from  news where id = " . $_GET['id']);
        echo $count;
    }

    public function update()
    {
        sleep(1);
        $stmt = $this->pdo->prepare("update news set " . $_GET['k'] . " =? where id =?");
        $stmt->bindParam(1, $_GET['v']);
        $stmt->bindParam(2, $_GET['id']);
        echo $stmt->execute();
    }

    public function insert()
    {
        $stmt = $this->pdo->prepare("insert into news (cid,title,dsc,image,url,create_time,content) values (?,?,?,?,?,?,?)");
        $stmt->bindValue(1, '');
        $stmt->bindValue(2, '');
        $stmt->bindValue(3, '');
        $stmt->bindValue(4, '');
        $stmt->bindValue(5, '');
        $stmt->bindValue(6, '');
        $stmt->bindValue(7, '');
        echo $stmt->execute();
    }

    public function index()
    {


        if (isset($_GET['page'])) {
            $page = $_GET['page'];
        } else {
            $page = 1;
        }

        $num = $this->pdo
            ->query('select count(*) as total from news')
            ->fetch()['total'];

        $page_total = ceil($num / $this::PER_PAGE);

        $news = $this->pdo
            ->query('select * from news limit '.$this::PER_PAGE.' offset ' . ($page - 1) * $this::PER_PAGE)
            ->fetchAll();


        include '../views/admin/news.html';
    }

    public function news()
    {
        include "../views/admin/admin.html";

    }
    public function search()
    {
        if(isset($_GET['s'])){
            $keyword = $_GET['s'];
        }else{
            $keyword = ' ';
        }
        if(isset($_GET['page'])){
            $page = $_GET['page'];
        }else{
            $page = 1;
        }
        $results = $this->pdo
            ->query('select * from news where title like "%'.$keyword.'%" limit '.$this::PER_PAGE.' offset '.($page-1)*$this::PER_PAGE)
            ->fetchAll();
        include '../views/admin/category.html';
    }
    public function searchList()
    {
//        include '../views/index/search.html';
        if(isset($_GET['s'])){
            $keyword = $_GET['s'];
        }else{
            $keyword = ' ';
        }
        if(isset($_GET['page'])){
            $page = $_GET['page'];
        }else{
            $page = 1;
        }
        $results = $this->pdo
            ->query('select * from news where title like "%'.$keyword.'%" limit '.$this::PER_PAGE.' offset '.($page-1)*$this::PER_PAGE)
            ->fetchAll();
        echo json_encode($results);
    }

}