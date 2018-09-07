<?php
include '../core/db.php';

class page extends db
{
    const PER_PAGE = 20;
    public function index()
    {
        //接收分类id
        if (isset($_GET['cid'])) {
            $cid = $_GET['cid'];
        } else {
            $cid = 1;
        }
//接收页数
        if (isset($_GET['page'])) {
            $page = $_GET['page'];
        } else {
            $page = 1;
        }

        $array = $this->pdo
            ->query('select * from category where is_default = "1"')
            ->fetchAll();
        $num = $this->pdo
            ->query('select count(*) as total from news where cid='.$cid)
            ->fetch()['total'];
        //总页数
        $page_total = ceil($num / $this::PER_PAGE);

//新闻
        $news = $this->pdo
            ->query(
                'select * from news where cid= ' . $cid . ' limit '.$this::PER_PAGE.' offset ' . ($page - 1) * $this::PER_PAGE
            )
            ->fetchAll();
        include '../views/index/index.html';
    }

    public function category()
    {
        $category = $this->pdo
            ->query('select * from category')
            ->fetchAll();
        include '../views/index/category.html';
    }
    public function search()
    {
        $total_number = null;
        $result = [];
        if (isset($_GET['wd'])) {
            $wd = $_GET['wd'];
            $total_number =
                $this->pdo
                    ->query('select count(*) as total_number from news where title like "%' . $wd . '%"')
                    ->fetch()['total_number'];

            $sql = 'select * from news where title like "%' . $wd . '%" limit ' . $this::PER_PAGE . ' offset 0';
            $result = $this->pdo->query($sql)->fetchAll();
        }
        include '../views/index/search.html';
    }

    //  搜索页面的数据资源
    public function news()
    {
        if (isset($_GET['page']) && isset($_GET['wd'])) {
            $page = $_GET['page'];
            $wd = $_GET['wd'];
            $sql = 'select * from news where title like "%' . $wd . '%" limit ' . $this::PER_PAGE . ' offset '.($page-1)*$this::PER_PAGE;
            $r = $this->pdo->query($sql)->fetchAll();
            echo json_encode($r);
        } else {
            echo json_encode('参数错误');
        }
    }
    public function mana(){
        include '../views/index/management.html';
    }
}

