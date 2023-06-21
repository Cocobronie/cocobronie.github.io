---
title: 一个校园卡消费充值APP
date: 2023-05-28 12:44:13
tags: Android APP
swiper_index: 3
top_group_index: 3
cover: mycover.png
ai: true
typora-root-url: ./..
---

# CardSpending APP

# 一、主要功能

### 1、用户刷卡登录

- 将卡片靠近读卡器
- 利用NFC功能读取IC卡中存储的用户ID以及password，再向远程服务器发出HTTP请求，远程服务器发送数据到手机中，最后页面响应变化反应给用户。

<img src="/images/CardSpending/Screenshot_20230114-134725-1685249167504-7.jpg" alt="Screenshot_20230114-134725" style="zoom: 15%;"/><img src="/images/CardSpending/Screenshot_20230114-134731-1685249242012-9.jpg" alt="Screenshot_20230114-134731" style="zoom:15%;" />



### 2、充值功能

- 输入充值金额或者点击相应的金额按钮使得确认按钮可点击
- 点击确认按钮，弹出**ReadDialog**,
- 将卡片贴近读卡器，**向卡片中写入信息**同时**更新服务器中的信息**
- 将更改的充值信息更新到UI界面上，可以看到下图**账户余额**变为250元

<img src="/images/CardSpending/Untitled-1685249374298-15.png" alt="Untitled" style="zoom:50%;" />

### 3、消费功能

- 输入消费金额或者点击相应的金额按钮使得确认按钮可点击
- 点击确认按钮，弹出**ReadDialog**,
- 将卡片贴近读卡器，**向卡片中写入信息**同时**更新服务器中的信息**
- 将更改的充值信息更新到UI界面上，可以看到下图**账户余额**变为230元

<img src="/images/CardSpending/Untitled%201-1685249325027-13.png" alt="Untitled 1" style="zoom:50%;" />

### 4、历史记录查看功能

- 进入“我的”界面，点击历史记录
- 跳转到历史记录界面
- 手机请求服务器数据，并更新到UI界面
- 可以看到下图出现最新的充值消费记录

<img src="/images/CardSpending/Screenshot_20230114-141614-1685249291919-11.jpg" alt="Screenshot_20230114-141614" style="zoom:15%;" />

# 二、实现方法

## 整体设计

![Untitled 2](/images/CardSpending/Untitled%202-1685249399313-17.png)

## 服务器端

- 使用**Node.js**实现后端逻辑
- 使用**Apipost**写接口文档
- 使用**花生壳**做****内网穿透****实现外网可以访问服务器

### 1、用户登录接口

[用户登录 - Powered by Apipost V7](https://console-docs.apipost.cn/preview/bfb37dde95f7dea8/793a161f3c06bbe9?target_id=8533f09a-d158-47f9-8ce5-d747009c5293)

<img src="/images/CardSpending/image-20230528133143833.png" alt="image-20230528133143833" style="zoom:50%;" />

```jsx
// 登录
router.get('/login', (req, res) => {
    req.query = querystring.parse(url.split('?')[1])
    //参数
    const Id = req.query.Id
    const password = req.query.passwo
    const sql = "select * from StuInfo where Id='" + Id + "'"
    let error = 'null'
    db.query(sql, function (err, result) {
        console.log("登录结果："+result)
        if (err) { error = "执行 SQL 语句失败" }                    // 执行 SQL 语句失败
        if (result.rowsAffected != 1) { error = '登录失败！' }   // 执行 SQL 语句成功，但是查询到数据条数不等于 1    
        console.log("用户名存在")         //用户名存在     
        res.setHeader("Content-type", "text/html;charset=utf8");//如果打开页面乱码, 设置

        if (error === 'null') {
            res.send(JSON.stringify({
                status: 0,
                message: '登录成功！',
                Id: result.recordset[0].Id,
                password: result.recordset[0].password,
                surplus: result.recordset[0].surplus,
                electricity: result.recordset[0].electricity,
                water: result.recordset[0].water,
                isHelp: result.recordset[0].isHelp,
            }))
        }
        else {
            res.send(JSON.stringify({
                status: 1,
                message: error
            }))
        }
    })
})
```

### 2、余额更新接口

[更新余额 - Powered by Apipost V7](https://console-docs.apipost.cn/preview/a7e5b575ed757db3/49bcb1e57f19c36c?target_id=d24e4644-8478-4315-8d2b-d6800efe48a1)

<img src="/images/CardSpending/image-20230528133216623.png" alt="image-20230528133216623" style="zoom:50%;" />

```jsx
// 更新surplus
router.get('/update', (req, res) => {
    req.query = querystring.parse(url.split('?')[1])
    //参数
    const Id = req.query.Id
    const password = req.query.password
    const surplus = req.query.surplus
    const sql = "update StuInfo set surplus='"+surplus+ "' where id='"+Id+"'"
    let error = 'null'
    db.query(sql, function (err, result) {
        console.log("更新结果："+result)
        if (err) { error = "执行 SQL 语句失败" }                    // 执行 SQL 语句失败
        if (result.rowsAffected != 1) { error = '登录失败！' }   // 执行 SQL 语句成功，但是查询到数据条数不等于 1    

        console.log("用户名存在")         //用户名存在     
        res.setHeader("Content-type", "text/html;charset=utf8");//如果打开页面乱码, 设置
        if (error === 'null') {
            res.send(JSON.stringify({
                status: 0,
                message: '修改成功！',
                Id: Id,
                password: password,
                surplus: surplus,
            }))
        }
        else {
            res.send(JSON.stringify({
                status: 1,
                message: error
            }))
        }
    })
})
```

### 3、查询历史记录接口

[查询历史记录 - Powered by Apipost V7](https://console-docs.apipost.cn/preview/83deb98d1f9881c6/2f37ecca48c2afe8?target_id=ab9700ab-5f9f-4475-8bee-ef39f742f5a2)

<img src="/images/CardSpending/image-20230528133239391.png" alt="image-20230528133239391" style="zoom:50%;" />

```jsx
// 查询历史记录
router.get('/history', (req, res) => 
    req.query = querystring.parse(url.split('?')[1])
    //参数
    const Id = req.query.Id
    const password = req.query.password
    const sql = "select * from History where Id='"+Id+"'"
    let error = 'null'
    db.query(sql, function (err, result) {
        console.log("历史记录查询结果："+result)
        if (err) { error = "执行 SQL 语句失败" }                    // 执行 SQL 语句失败
        if (result.rowsAffected < 1) { error = '登录失败！' }   // 执行 SQL 语句成功，但是查询到数据条数不等于 1    
        console.log("用户名存在")         //用户名存在     
        res.setHeader("Content-type", "text/html;charset=utf8");//如果打开页面乱码, 设置
        if (error === 'null') {
            res.send(JSON.stringify({
                status: 0,
                message: '查询成功！',
                Id: Id,
                password: password,
                history:result.recordsets[0]
            }))
        }
        else {
            res.send(JSON.stringify({
                status: 1,
                message: error
            }))
        }
    })
})
```

### 4、添加历史记录接口

[添加历史记录接口 - Powered by Apipost V7](https://console-docs.apipost.cn/preview/3948990c824fc8cd/4f01552dd8b40f0f?target_id=d33893d9-192a-4a03-b327-4e0fbc777d97)

<img src="/images/CardSpending/image-20230528133300931.png" alt="image-20230528133300931" style="zoom:50%;" />

```jsx
router.get('/addhistory', (req, res) => 
    req.query = querystring.parse(url.split('?')[1])
    //参数
    const Id = req.query.Id
    const date = req.query.date
    const money = req.query.money
    const type = req.query.type
    //insert into History values('8202201417','2022-1-3 16:18:23','充值记录','5.22')
    const sql = "insert into History values('"+Id+"','"+date+"','"+type+"','"+money+"')"
    let error = 'null'
    db.query(sql, function (err, result) {
        console.log("历史记录添加结果："+result)
        if (err) { error = "执行 SQL 语句失败" }                    // 执行 SQL 语句失败
        if (result.rowsAffected < 1) { error = '登录失败！' }   // 执行 SQL 语句成功，但是查询到数据条数不等于 1    
        console.log("用户名存在")         //用户名存在     
        res.setHeader("Content-type", "text/html;charset=utf8");//如果打开页面乱码, 设置
        if (error === 'null') {
            res.send(JSON.stringify({
                status: 0,
                message: '添加成功！',
                Id: Id,
                type: type,
                date:date,
                money:money
            }))
        }
        else {
            res.send(JSON.stringify({
                status: 1,
                message: error
            }))
        }
    })
})
```

### 5、Node数据库连接

这里是连接本地数据库

```jsx
// 导入 mysql 模块
const mssql = require('mssql')

// 创建数据库连接对象
var db = {};
var config = {
    user: 'sa',
    password: '123456',
    server: '127.0.0.1',
    database: 'dbsqlconnect',
    port: 1433,
    options: {
        encrypt: false // Use this if you're on Windows Azure
    },
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 3000
    }
};

//执行sql,返回数据.
db.query = function (sql, callBack) {
    var connection = new mssql.ConnectionPool(config, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        var ps = new mssql.PreparedStatement(connection);
        ps.prepare(sql, function (err) {
            if (err) {
                console.log(err);
                return;
            }
            ps.execute('', function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }

                ps.unprepare(function (err) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                        return;
                    }
                    callBack(err, result);
                });
            });
        });
    });
};

// 向外共享 db 数据库连接对象
module.exports = db
```

### 6、数据库设计

一共有两个表格

```sql
select * from StuInfo
drop table StuInfo
create table StuInfo
(
	Id varchar(40),
	password varchar(40),
	surplus varchar(40),
	electricity varchar(20),
	water varchar(40),
	isHelp varchar(20)
)

insert into StuInfo values('8202201417','1234','23.5','56.4','324.3','0')

create table History
(
	Id varchar(40),
	date varchar(40),
	type varchar(40),
	money varchar(20),
)
drop table History
--yyyy-MM-dd HH:mm:ss
insert into History values('8202201417','2022-1-3 16:18:23','消费记录','16.4')
insert into History values('8202201417','2022-1-3 16:18:23','消费记录','4.4')
insert into History values('8202201417','2022-1-3 16:18:23','消费记录','56.4')
insert into History values('8202201417','2022-1-3 16:18:23','充值记录','5.22')
select * from History where Id='8202201417'
select * from History
```

**数据库：dbsqlconnect**

- **StuInfo**

<img src="/images/CardSpending/Untitled%2015-1685252038490-19.png" alt="Untitled 15" style="zoom:67%;" />

- **History**

<img src="/images/CardSpending/Untitled%2016-1685252055780-21.png" alt="Untitled 16" style="zoom:50%;" />

### 7、花生壳内网穿透

[花生壳管理 - 内网穿透 (oray.com)](https://console.hsk.oray.com/forward)

<img src="/images/CardSpending/Untitled%2017-1685252073223-23.png" alt="Untitled 17" style="zoom: 33%;" />

这里需要注意的是：

**内网的ip地址有可能改变，所以需要在使用之前确认**。

## 客户端

客户端的设计主要分为ui设计，以及一些逻辑实现。其中逻辑部分包括：

- 读卡部分
- 数据库操作
- 网络连接
- 界面数据共享与更新

### 1、读卡部分

```jsx
/**
读取NFC内容
 */
public static String[] read(Tag tag){
    String[] s_blocks = new String[20];
    MifareClassic mif = MifareClassic.get(tag);
    int ttype = mif.getType();
    Log.d(TAG, "MifareClassic tag type: " + ttype);
    int tsize = mif.getSize();
    Log.d(TAG, "tag size: " + tsize);
    int s_len = mif.getSectorCount();
    Log.d(TAG, "tag sector count: " + s_len);
    int b_len = mif.getBlockCount();
    Log.d(TAG, "tag block count: " + b_len);
    try {
        mif.connect();
        if (mif.isConnected()){
            for(int i=0; i< s_len; i++){
                boolean isAuthenticated = false;
                if (mif.authenticateSectorWithKeyA(i, MifareClassic.KEY_MIFARE_APPLICATION_DIRECTORY)) {
                    isAuthenticated = true;
                } else if (mif.authenticateSectorWithKeyA(i, MifareClassic.KEY_DEFAULT)) {
                    isAuthenticated = true;
                } else if (mif.authenticateSectorWithKeyA(i,MifareClassic.KEY_NFC_FORUM)) {
                    isAuthenticated = true;
                } else {
                    Log.d("TAG", "Authorization denied ");
                }

                if(isAuthenticated) {
                    int block_index = mif.sectorToBlock(i);
                    Log.e(TAG, String.valueOf(block_index));
                    byte[] block = mif.readBlock(block_index);
                    String s_block = new String(block,"UTF-8");
                    s_blocks[i] = s_block;
                    Log.d(TAG, s_block);
                }
            }
        }
        mif.close();
    } catch (IOException e) {
        e.printStackTrace();
    }

    return s_blocks;
}
```

### 2、网络连接

- **用户刷卡登录请求服务器数据**

```jsx
//构建URL请求并获取内容
    public Student fetchItems(boolean isUpdate) {
        mStudent=Student.getStudent();
        try {
            String url;
            if(isUpdate){
                url = Uri.parse("https://6737k8d627.goho.co/api/update")
                        .buildUpon()
                        .appendQueryParameter("Id", mStudent.getId())
                        .appendQueryParameter("password", mStudent.getPassword())
                        .appendQueryParameter("surplus", mStudent.getSurplus())
                        .build().toString();
            }
            else{
                url = Uri.parse("https://6737k8d627.goho.co/api/login")
                        .buildUpon()
                        .appendQueryParameter("Id", mStudent.getId())
                        .appendQueryParameter("password", mStudent.getPassword())
                        .build().toString();
            }
            String jsonString = getUrlString(url);
            Log.e(TAG, "Received JSON: " + jsonString);
            //将JSON数据解析成相应的Java对象
            JSONObject jsonBody = new JSONObject(jsonString);
            String status = jsonBody.getString("status");
            String message = jsonBody.getString("message");
            Log.e(TAG,"status : "+status);
            Log.e(TAG,"message : "+message);
            //判断登录状态
            if(status.equals("0")){ //登录成功
                mStudent.setId(jsonBody.getString("Id"));
                mStudent.setPassword(jsonBody.getString("password"));
                mStudent.setSurplus(jsonBody.getString("surplus"));
                mStudent.setElectricity(jsonBody.getString("electricity"));
                mStudent.setWater(jsonBody.getString("water"));
                mStudent.setIsHelp(jsonBody.getString("isHelp"));
            }
            else{                   //登录失败:弹出Dialog提示卡片不正确
                mStudent.setPassword("wrong");
            }
```

- **用户充值消费更改服务器数据**

```jsx
/**
*实现AsyncTask工具类
*/
private class FetchItemsTask extends AsyncTask<Void,Void, Student> {
    private String mSurplus;
    private boolean mIsUpdate;
    public FetchItemsTask(boolean isUpdate) {
        mIsUpdate = isUpdate;
    }

    @Override
    protected Student doInBackground(Void... params) {
        return new StudentFetcher().fetchItems(mIsUpdate);
    }

    @Override
    protected void onPostExecute(Student items) {
        Log.e("mStudent",items.getId());
        if(items.getPassword().equals("wrong")){     //登录失败:弹出Dialog提示卡片不正确
            tipDialog(MainActivity.this,"您的卡不在系统中");
    }else{                                           //登录成功:更新界面
            setUI();
        }
    }

}
```

```jsx
/**
 *实现AsyncTask工具类
 */
private class FetchItemsTask extends AsyncTask<Void,Void, HistoryLab> {

    @Override
    protected HistoryLab doInBackground(Void... params) {
        String url;
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(new Date());
        url = Uri.parse("https://6737k8d627.goho.co/api/addhistory")
                .buildUpon()
                .appendQueryParameter("Id", mStudent.getId())
                .appendQueryParameter("type", "充值记录")
                .appendQueryParameter("date", dateString)
                .appendQueryParameter("money", mMoney)
                .build().toString();
        return new HistoryFetcher().fetchItems(url);
    }

    @Override
    protected void onPostExecute(HistoryLab items) {
    }
}
```

- **用户获取历史记录数据**

```jsx
/**
 *实现AsyncTask工具类
 */
private class FetchItemsTask extends AsyncTask<Void,Void, HistoryLab> {

    @Override
    protected HistoryLab doInBackground(Void... params) {
        String url;
        url = Uri.parse("https://6737k8d627.goho.co/api/history")
                .buildUpon()
                .appendQueryParameter("Id", mStudent.getId())
                .appendQueryParameter("password", mStudent.getPassword())
                .build().toString();
        return new HistoryFetcher().fetchItems(url);
    }

    @Override
    protected void onPostExecute(HistoryLab items) {
        mHistoryLab = items;
        setupAdapter();
        //updateView();
    }
}
```

### 3、界面数据共享与更新

```jsx
public class MeViewModel extends ViewModel {

    private final MutableLiveData<Student> mStudent;
    private final MutableLiveData<String> mMoney;

    public MeViewModel() {
        mStudent = new MutableLiveData<>();
        mMoney= new MutableLiveData<String>();
    }

    public void setMoney(String money) {
        mMoney.setValue(money);
    }

    public LiveData<String> getMoney() {
        return mMoney;
    }

    public void setStudent(Student student) {
        mStudent.setValue(student);
    }

    public LiveData<Student> getStudent() {
        return mStudent;
    }
}
```
