---
title: 一个天气预报APP
date: 2023-05-28 11:07:30
tags: Android APP
swiper_index: 2
top_group_index: 2
cover: mycover.png
ai: true
typora-root-url: ./..
---

# Weather Broadcast APP

Created: December 3, 2022 12:43 AM

# 视频展示
<video  controls="" preload="" height="400px" > 
    <source  src="/images/WeatherBroadcast/23-05-28-11-33-28.mp4" type="video/mp4"> 
</video>





# 一、主要功能

## 1、**主视图**和**细节视图**

在手机中包含**主视图**和**细节视图**，**主视图**显示连续多天的天气预报简讯，如图表 1所示，用户在主视图中点击某一天的天气简讯以后，跳出**细节视图**，显示用户选定当天天气的详细信息。

<img src="/images/WeatherBroadcast/image-20230528112048700.png" alt="image-20230528112048700" style="zoom:33%;" />

## 2、 支持平板显示

在**平板**中使用**Master-detail**视图，当用户点击某一天的天气预览以后，直接在界面右边显示当天天气的详细信息，如图表 3所示。

<img src="/images/WeatherBroadcast/image-20230528112110529.png" alt="image-20230528112110529" style="zoom:33%;" />

## 3、主视图菜单栏功能实现

- 主视图中包含**Map Location**和**setting**选项，通过**”Map location”** 选项，可以调用手机中安装的地图应用显示当前天气预报所对应的位置，如图表 4所示，用户可以通过**setting**选项可以修改天气预报的位置，温度的单位（华氏度、摄氏度）以及是否开启天气通知，如图表 5所示。如果setting选项中的**天气通知选项**打开，会**定期发送通知消息**，其中显示当天的天气简讯，如图表 6所示。

  <img src="/images/WeatherBroadcast/image-20230528112239798.png" alt="image-20230528112239798" style="zoom:33%;" />

## 4、细节视图菜单栏功能实现

细节视图菜单中包含**分享**和**setting选项**，用户可以通过分享选项通过其他应用（邮件、短信等）将天气详细信息分享给别人。如图表 2所示。

<img src="/images/WeatherBroadcast/image-20230528112305880.png" alt="image-20230528112305880" style="zoom:57%;" />

## 5、SQLite对天气预报数据进行持久化保存

利用SQLite对天气预报数据进行持久化保存，如果网络不可用的情况下，从SQLite中提取天气预报数据。

## 6、调用Web API获取天气预报数据

heweather：[https://www.heweather.com/documents/api/s6/weather-forecast](https://www.heweather.com/documents/api/s6/weather-forecast)

# 二、开发细节

## 1、UI设设计

<img src="/images/WeatherBroadcast/image-20230528112329509.png" alt="image-20230528112329509" style="zoom:50%;" />

## 2、MainActivity+平板功能实现

### **功能**

- 判断设备是`phone`/`paid`并托管到不同的`layout`文件中

- 平板功能实现：在**平板**中使用**Master-detail**视图，当用户点击某一天的天气预览以后，直接在界面右边显示当天天气的详细信息。

  - **实现方式一：**`MainFragment.WeatherHolder`中的`onClick()`中将`DetailFragment`添加到`detailFragmentContainer`中。

    缺点：破坏fragment的封装

  - **实现方式二：**在`fragment`中定义回调接口，委托托管`activity`来完成那些不应该由`fragment`处理的任务。

### 知识点

- **别名资源**指向了不同的资源文件

<img src="/images/WeatherBroadcast/image-20230528112408350.png" alt="image-20230528112408350" style="zoom: 33%;" />

- **Fragment回调接口**

### **Fragment回调接口的实现**

- `MainFragment`添加回调接口

```java
private Callbacks mCallbacks;   //回调接口

//回调接口:需要托管activity实现
    public interface Callbacks{
        void onWeatherSelected(Weather weather);
    }

    //在fragment附加给activity时调用
    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
        mCallbacks = (Callbacks) activity;
    }

    //清空变量
    @Override
    public void onDetach() {
        super.onDetach();
        mCallbacks = null;
    }
```

- **在`Mainactivity`中实现**

```java
/*
        实现其托管fragment的回调接口
            1、如果是Phone：启动新的PagerActivity
            2、如果是paid：将DetailFragment放入detailFragmentContainer中
     */
    @Override
    public void onWeatherSelected(Weather weather) {
        if (findViewById(R.id.detailFragmentContainer) == null) {   //Phone
           Intent intent = PagerActivity.newIntent(this,weather.getId());
           startActivity(intent);
        }
        else                                                        //Paid
        {
            Fragment newDetail = DetailFragment.newInstance(weather.getId());
            getSupportFragmentManager().beginTransaction().replace(R.id.detailFragmentContainer,newDetail).commit();
        }
    **}
```

- 在`MainFragment`中调用

```java
@Override
        public void onClick(View v) {
            //跳转到细节视图
//            Intent intent = PagerActivity.newIntent(getActivity(), mWeather.getId());
//            startActivity(intent);
            //使用回调方法
            mCallbacks.onWeatherSelected(mWeather);
```

## 3、MainFragment

### 功能

- 实例化单例
- 实例化数据库
- 实例化`RecyclerView`
- 监听用户点击，并跳转到`DetialActivity`
- 从网上获取数据，并显示在组件中
- 监听`Menu`的点击事件

### 知识点

- `RecyclerView`实例化及其逻辑实现
- `Menu`实例化，并实现监听
- 启动后台线程`AsyncTask`，实现数据获取
- `Fragment`跳转到Activity并传递数据
- `notification`实现消息推送
- `SQLlite`实现数据持久化

### 要点

**1、从`Fragment`跳转到`Activity`并传递数据**

**`MainFragment`**

```java
//调用Fragment.startActivity(Itent)
Intent intent = DetailActivity.newIntent(getActivity(), mWeather.getId());
startActivity(intent);
```

**`DetailActivity`**

```java
private static final String EXTRA_WEATHER_ID = "com/example/weatherbroadcast.weather_id";
//启动DetailActivity并传递参数
public static Intent newIntent(Context packageContext, UUID weathereId) {
    Intent intent = new Intent(packageContext, DetailActivity.class);
    intent.putExtra(EXTRA_WEATHER_ID, weathereId);
    return intent;
}
```

## 4、DetailActivity

### **功能**

- 托管DetailFragment
- 传递数据WeatherID

### 知识点：`FragmentAugment`实现

`**DetailActivity`获取数据并传递给其托管的Fragment的两种方法**

- **直接获取数据，直接传递——由Activity获取数据**

`UUID`是`Serializable`对象

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_detail);

    //获取intent传入的信息
    weatherId = (UUID) getIntent().getSerializableExtra(EXTRA_WEATHER_ID);
		//绑定Fragment
    FragmentManager fm = getSupportFragmentManager();
    Fragment fragment = fm.findFragmentById(R.id.fragment_container3);
    if (fragment == null) {
        fragment = createFragment();
        fm.beginTransaction()
                .add(R.id.fragment_container3, fragment)
                .commit();
    }
}
    //创建Fragment
    private Fragment createFragment() {
				//直接传递数据
        return DetailFragment.newInstance(weatherId);
    }
}
```

**缺点：**

破坏了**`CrimeFragment`**的封装，**`CrimeFragment`**不再是可以复用的单元。

- **使用`fragmentargument`——由Fragment获取数据**

**augment：参数**

将`weatherID`存储到`Fragment`的某个地方而不是`Activity`中。

每个`Fragment`实例都有一个**`Bundle`**对象，**`Bundle`**对象包含键值对，可以将参数添加到`**Bundle**`对象中

```java
//附加augmentbundle给Fragment
Fragment.setArguments(Bundle)
//Bundle添加argument
Bundle.putSerializable(Key,Value)
```

## 5、PagerActivity

### **功能**

- 实现左右滑动屏幕

### 知识点：`ViewPager`实现

**步骤：**

- 创建`PagerActivity`类，以`VeiwPager`为根视图
- 定义包含`ViewPager`的视图层级结构
- 在`PagerActivity`类中关联使用`ViewPager`及其`Adapter`

### Bug

只能显示6天的Pager

Bug修复：我把数据库课WetherLab封装在一起了

### 代码

```java
public class PagerActivity extends AppCompatActivity {

    private static final String EXTRA_WEATHER_ID = "com/example/weatherbroadcast/DetailActivity.java.weather_id";
    private ViewPager mViewPager;
    private List<Weather> mWeathers;

    //启动PagerActivity并传递参数
    public static Intent newIntent(Context packageContext, UUID weathereId) {
        Intent intent = new Intent(packageContext, PagerActivity.class);
        intent.putExtra(EXTRA_WEATHER_ID, weathereId);
        return intent;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pager);

        mViewPager = (ViewPager) findViewById(R.id.view_pager);
        mWeathers = WeatherLab.get(this).getWeathers();

        //获取intent传入的信息
        UUID weatherId = (UUID) getIntent().getSerializableExtra(EXTRA_WEATHER_ID);

        //设置点击之后显示的界面
        for (int i = 0; i < mWeathers.size(); i++) {
            if (mWeathers.get(i).getId().equals(weatherId)) {
                mViewPager.setCurrentItem(i);
                break;
            }

            //创建Adapter
            FragmentManager fragmentManager = getSupportFragmentManager();
            mViewPager.setAdapter(new FragmentStatePagerAdapter(fragmentManager) {
                @NonNull
                @Override
                public Fragment getItem(int position) {
                    Weather weather = mWeathers.get(position);
                    //实例化DetailFragment
                    return DetailFragment.newInstance(weather.getId());
                }

                @Override
                public int getCount() {
                    Log.e("mWeathers.size : ", String.valueOf(mWeathers.size()));
                    return mWeathers.size();
                }
            });
        }
    }
}
```

## 6、SQLlite+WeatherLab单例封装

### **功能**

- **实现数据持久化**

### 知识点

- **单例如何实例化？**

**在类中声明为静态变量并且实例化。**

```java
public class WeatherLab {
    private static WeatherLab sWeatherLab;
    private SQLiteDatabase mDatabase;
    private Context mContext;

    //单例的意思：在类里已经实例化了
    public static WeatherLab get(Context context) {
        if (sWeatherLab == null) {
            sWeatherLab = new WeatherLab(context);
        }
        return sWeatherLab;
    }
```

- **这里将数据库也实现单例**

```java
public static Context getContext(){
        return sWeatherLab.mContext;
    }

    private WeatherLab(Context context) {
        mContext = context.getApplicationContext();
        //打开数据库，如果不存在就先调用DataBaseHelper.onCreate()创建
        mDatabase = new DatabaseHelper(mContext).getWritableDatabase();
    }
```

- **实现数据库`Schema`类：定义描述数据表元素的String常量**

```java
public class DbSchema {
    public static final class WeatherTable {
        public static final String NAME = "WeatherTab";

        public static final class Cols {
            public static final String UUID = "uuid";
            public static final String TITLE = "title";
            public static final String DATE = "date";
            public static final String SOLVED = "solved";
        }
    }
}
```

- **DataBaseHelper类**

```java
public class DatabaseHelper extends SQLiteOpenHelper {
    private static final int VERSION = 1;
    private static final String DBNAME="User.db";   //  创建数据库名叫 Users

    public DatabaseHelper(Context context){
        super(context,DBNAME,null,VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        //db.execSQL("create table WeatherTable (_id INTEGER PRIMARY KEY AUTOINCREMENT,date text,max_temp text,min_temp text,weather text,humidity text,pressure text,wind text,icon text)");
        db.execSQL("create table "+ NAME+"("+
                    "_id INTEGER PRIMARY KEY AUTOINCREMENT,"+
                    DbSchema.Cols.UUID+" text, "+
                    DbSchema.Cols.DATE+" text,"+
                    DbSchema.Cols.MAX_TEMP+" text,"+
                    DbSchema.Cols.MIN_TEMP+" text,"+
                    DbSchema.Cols.WEATHER+" text,"+
                    DbSchema.Cols.HUMIDITY+" text,"+
                    DbSchema.Cols.PRESSURE+" text,"+
                    DbSchema.Cols.WIND+" text,"+
                    DbSchema.Cols.ICON+" text"+
                    ")");
    }
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        //TODO
    }
```

- **修改WeatherLab：改用数据库存储数据**

  - **实现`CursorWrapper`子类帮助查询数据库**

  ```java
  //创建Cursor子类用于查询
      public class WeatherCursorWrapper extends CursorWrapper {
  
          public WeatherCursorWrapper(Cursor cursor) {
              super(cursor);
          }
  
          public Weather getWeather() {
              String UUID = getString(getColumnIndex(DatabaseHelper.DbSchema.Cols.UUID));
              String DATE = getString(getColumnIndex(DatabaseHelper.DbSchema.Cols.DATE));
              String MAX_TEMP = getString(getColumnIndex(DatabaseHelper.DbSchema.Cols.MAX_TEMP));
              String MIN_TEMP = getString(getColumnIndex(DatabaseHelper.DbSchema.Cols.MIN_TEMP));
              String WEATHER = getString(getColumnIndex(DatabaseHelper.DbSchema.Cols.WEATHER));
              String HUMIDITY = getString(getColumnIndex(DatabaseHelper.DbSchema.Cols.HUMIDITY));
              String PRESSURE = getString(getColumnIndex(DatabaseHelper.DbSchema.Cols.PRESSURE));
              String WIND = getString(getColumnIndex(DatabaseHelper.DbSchema.Cols.WIND));
              String ICON = getString(getColumnIndex(DatabaseHelper.DbSchema.Cols.ICON));
  
              Weather weather = new Weather();
              weather.setId(java.util.UUID.fromString(UUID));
              weather.setDate(DATE);
              weather.setMaxTemperature(MAX_TEMP);
              weather.setMinTemperature(MIN_TEMP);
              weather.setWeather(WEATHER);
              weather.setHumidity(HUMIDITY);
              weather.setPressure(PRESSURE);
              weather.setWind(WIND);
              weather.setIconUrl(ICON);
  
              return weather;
          }
      }
  ```

  ```java
  //实例化WeatherCursorWrapper 
  WeatherCursorWrapper cursor = queryWeathers(null, null);
  ```

  - `**ContentValues`:键值储存类，只能处理SQLite数据**

  ```java
  //ContentValues:键值储存类，只能处理SQLite数据
      private static ContentValues getContentValues(Weather weather) {
          ContentValues values = new ContentValues();
          values.put(DatabaseHelper.DbSchema.Cols.UUID, weather.getId().toString());
          values.put(DatabaseHelper.DbSchema.Cols.DATE, weather.getDate());
          values.put(DatabaseHelper.DbSchema.Cols.MAX_TEMP, weather.getMaxTemperature());
          values.put(DatabaseHelper.DbSchema.Cols.MIN_TEMP, weather.getMinTemperature());
          values.put(DatabaseHelper.DbSchema.Cols.WEATHER, weather.getWeather());
          values.put(DatabaseHelper.DbSchema.Cols.HUMIDITY, weather.getHumidity());
          values.put(DatabaseHelper.DbSchema.Cols.PRESSURE, weather.getPressure());
          values.put(DatabaseHelper.DbSchema.Cols.WIND, weather.getWind());
          values.put(DatabaseHelper.DbSchema.Cols.ICON, weather.getIconUrl());
          return values;
      }
  ```

  - **删除数据库之后记得立马要`create`一个，不然`quary`报错**

  ```java
  //判断数据库是否为空
      public boolean isEmpty(){
          WeatherCursorWrapper cursor = queryWeathers(null, null);
          return cursor.getCount()==0||cursor==null;
      }
  //如果数据库不为空
          if(!sWeatherLab.isEmpty()){
              mDatabase.execSQL("drop table "+DatabaseHelper.DbSchema.NAME);
              mDatabase.execSQL("create table "+ NAME+"("+
                      "_id INTEGER PRIMARY KEY AUTOINCREMENT,"+
                      DatabaseHelper.DbSchema.Cols.UUID+" text, "+
                      DatabaseHelper.DbSchema.Cols.DATE+" text,"+
                      DatabaseHelper.DbSchema.Cols.MAX_TEMP+" text,"+
                      DatabaseHelper.DbSchema.Cols.MIN_TEMP+" text,"+
                      DatabaseHelper.DbSchema.Cols.WEATHER+" text,"+
                      DatabaseHelper.DbSchema.Cols.HUMIDITY+" text,"+
                      DatabaseHelper.DbSchema.Cols.PRESSURE+" text,"+
                      DatabaseHelper.DbSchema.Cols.WIND+" text,"+
                      DatabaseHelper.DbSchema.Cols.ICON+" text"+
                      ")");
          }
  ```

### 报错 **table WeatherTab has no column named min_temp**

![image-20230528112458417](/images/WeatherBroadcast/image-20230528112458417.png)

**table WeatherTab has no column named min_temp in "INSERT INTO WeatherTab(min_temp,pressure,date,icon,uuid,wind,max_temp,humidity,weather) VALUES (?,?,?,?,?,?,?,?,?)”**

**原因：数据表创建语句中字段前没有空格**

[table xxx has no column named id (code 1)？表中插入数据找不到字段？_奋斗的IT小民工的博客-CSDN博客](https://blog.csdn.net/u013040819/article/details/81489137)

## 7、Share功能

### **功能**

- **点击Menu分享键分享天气**

### **知识点**

- **隐式Intent的组成**
  - 要执行的操作
  - 待访问数据的位置
  - 操作涉及的数据类型
  - 可选类别

### 代码

```java
case R.id.share:
                //Intent.ACTION_SEND:要执行的操作
                Intent i = new Intent(Intent.ACTION_SEND);
                //操作涉及的数据类型
                i.setType("text/plain");
                //待访问数据的位置
                i.putExtra(Intent.EXTRA_TEXT,createMessage());
                startActivity(i);
                return true;
```

## 8、Notification——**IntentService的子类**

### **功能**

- 定期发送通知给用户，显示在状态栏中
- 保证用户在使用应用时不出现新结果通知

### **知识点**

- **后台服务：IntentService**

- **SharedPreferences：保存数据（location、unit）**

- **AlarmManager延迟运行**

- **通知消息：Notification**

- **Broadcast Intent**

  ![image-20230528112524704](/images/WeatherBroadcast/image-20230528112524704.png)

### **后台服务：IntentService**

- 创建**`IntentService`**类继承`IntentService`
- `manifest`中配置`<service android:name=".Notification"></service>`

注意构造函数不能带参数

- 在`MainFragment`的`onCreate()`中添加服务启动代码

```java
//启动Notification服务
        Intent i = Notification.newIntent(getActivity());
        getActivity().startService(i);
```

![image-20230528112547986](/images/WeatherBroadcast/image-20230528112547986.png)

- **IntentService**在没有`activity`运行的情况下为**在后台运行的服务**，需要想个办法启动它。

  使用**`AlarmManager`：可以发送intent的系统服务**

  使用`PendingIntent`打包一个`intent`:”我想启动Notification服务”

  在`PendingIntent`中实现一个启停定时器的`setServiceAlarm()`

  - **添加定时方法**

  ```java
  //设置时间间隔是1分钟
      private static final long NOTI_INTERVAL_MS = TimeUnit.MINUTES.toMillis(1);
      public static void setServiceAlarm(Context context,boolean isOn){
          Intent i = Notification.newIntent(context);
          //创建一个用来启动Notification服务的PendingIntent
          PendingIntent pendingIntent = PendingIntent.getService(context,0,i,FLAG_MUTABLE);
          //设置定时器
          AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
          if(isOn){
              alarmManager.setRepeating(AlarmManager.ELAPSED_REALTIME, SystemClock.elapsedRealtime(),NOTI_INTERVAL_MS,pendingIntent);
          }
          else{
              alarmManager.cancel(pendingIntent);
              pendingIntent.cancel();
          }
      }
  ```

  - 使用`PendingIntent`管理定时器

  ```java
  public static boolean isServiceAlarmOn(Context context){
          Intent intent = NotificationService.newIntent(context);
          PendingIntent pendingIntent = PendingIntent.getService(context,0,intent,PendingIntent.FLAG_NO_CREATE);
          return pendingIntent!=null;
      }
  ```

  - 在`MainFragment`中设置定时开/闭

  ```java
  public void onResume() {
    super.onResume();
    SharedPreferences pref = getActivity().getSharedPreferences("set", MODE_PRIVATE);
    String send = pref.getString("send","是");
    if (send=="是"){
        //开启后台服务，启动定时器，发送通知消息
        NotificationService.setServiceAlarm(getActivity(),true);
    }else{
        NotificationService.setServiceAlarm(getActivity(),false);
    }
  }
  ```

### Notification

- 创建`Notification`对象

完整的`notification`包括：

- 首次显示通知消息时，在状态栏上显示ticker text、图标
- 在Lollipop之后状态栏上不显示ticker text、图标
- 是通知抽屉的一个视图
- 待触发的`PendingIntent`，用户点击抽屉中的通知消息触发

```java
@Override
    protected void onHandleIntent(@Nullable Intent intent) {
        Log.e(TAG,"接收一个intent："+intent);
    /*
    设置通知消息
     */
        Resources resources = getResources();
        Intent i = MainActivity.newIntent(this);
				//不可变的PendingIntent
        PendingIntent pendingIntent = PendingIntent.getActivity(this,0,i,FLAG_IMMUTABLE);
        Notification notification = null;
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this)
                .setTicker(resources.getString(R.string.new_weather_title))
                .setSmallIcon(android.R.drawable.ic_menu_report_image)
                .setContentTitle(resources.getString(R.string.new_weather_title))
                .setContentText(resources.getString(R.string.new_weather_text))
                .setContentIntent(pendingIntent)
                .setAutoCancel(true);
        NotificationManager notificationManager =(NotificationManager) getSystemService(NOTIFICATION_SERVICE);

        //一定要设置channel
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel("to-do"
                    , "待办消息",
                    NotificationManager.IMPORTANCE_HIGH);
            channel.enableVibration(true);
            channel.setVibrationPattern(new long[]{500});
            notificationManager.createNotificationChannel(channel);
            builder.setChannelId("to-do");
            notification = builder.build();
        } else {
            notification = builder.build();
        }

        notificationManager.notify(0,notification);
        System.out.println(notification);
```

[浅谈通知频道NotificationChannel](https://www.jianshu.com/p/4c51c071aa94)

从Android8.0开始，应用显示通知时，必须为通知指定一个`Channel`。

`NotificationChannel`构造方法需要三个参数，

- `ChannelId`是自定义的字符串
- 第二个参数是频道的名称
- 第三个是优先级。

创建完`NotificationChannel`之后，还需要使用`createNotificationChannels`方法注册到系统中。

### **Broadcast Intent（待实现）**

## 9、Map功能

### **功能**

- **点击MapLocation启动手机中的Map**

### **知识点**

- **隐式Intent的组成**

```java
Intent intent = new Intent(Intent.ACTION_VIEW);
Uri geoLocation = Uri.parse("geo:28.156198193290255,112.93207570910455?z=11");
intent.setData(geoLocation);
if (intent.resolveActivity(getContext().getPackageManager()) != null) {
    startActivity(intent);
}
```

### Bug

MapApp无法显示定位
