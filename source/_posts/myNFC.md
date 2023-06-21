---
title: 简单的NFC读写器APP
date: 2023-05-28 14:15:21
tags: Android APP
swiper_index: 20000
top_group_index: 20000
cover: mycover.jpg
ai: true
typora-root-url: ./..
---



# 简单的NFC读写器

Created: February 5, 2023 11:30 PM

## 视频演示

<video  controls="" preload="" height="400px" > 
    <source  src="/images/myNFC/video.mp4" type="video/mp4"> 
</video>



## 一、功能描述

为了便于中南大学的老师们体测成绩登记更加快捷方便，基于13.56MHz通信技术和手机的NFC功能，使用老师派发的RFID卡片和NFC标签，构建了一个RFID应用系统，实现对Ndef和MifareClassic两种卡片数据的读写。



## 二、设计简要描述

### 1、UI界面设计

<img src="/images/myNFC/image-20230528141821319.png" alt="image-20230528141821319" style="zoom: 67%;" />

### 2、程序设计

<img src="/images/myNFC/image-20230528141851384.png" alt="image-20230528141851384" style="zoom: 50%;" />

首先判断是否支持NFC，再判断NFC是否打开，若没有打开则跳转到手机的设置界面。如果打开此时可以看到按钮状态，只有ReadBtn是可点击的，点击ReadBtn，弹出ReadDialog寻找标签，当标签靠近时关闭ReadDialog，判断标签数据类型，读取标签数据同时更改主界面文本框中的值。此时WriteBtn变为可点击，点击WriteBtn，根据ReadBtn判断的标签数据类型弹出相应的InputDialog，最后弹出ReadDialog寻找标签并将数据写入，最后将更改完毕之后的数据呈现到主界面的文本框中。

## 三、学习笔记

### 1、标签可以分为两大类：

1、`NDEF TAG`：常见的NFC

2、`非NDEF TAG`：RFID 卡片

### 2、**Android支持的数据格式**

![Untitled](/images/myNFC/Untitled-1685255140308-1.png)

- **实验中的mifare卡片的数据格式为MifareClassic**
- **实验中的NFC标签的数据格式为Ndef**

### 3、byte转string

### 4、NdefMessage 、NdefRecord（适用于NDEF TAG）

`NdefMessage`：主要是描述NDEF格式的信息

`NdefRecord`：这个是NDEF信息的一个信息段

`NdefMessage`中包含许多`NdefRecord`

## 四、程序清单

### 1、判断是否支持NFC

```java
/*
判断NFC功能是否可用
*/
private void NfcCheck(){
    //初始化mNfcAdapter
    mNfcAdapter = NfcAdapter.getDefaultAdapter(this);
    if(mNfcAdapter==null){//不支持NFC
        Toast.makeText(this,"不支持NFC",Toast.LENGTH_SHORT).show();
    }else{//判断NFC是否打开
        if(!mNfcAdapter.isEnabled()){    //如果没有打开，则跳转到设置界面
            Intent setNfc = new Intent(Settings.ACTION_NFC_SETTINGS);
            startActivity(setNfc);
        }else{
            Toast.makeText(this,"NFC已打开",Toast.LENGTH_SHORT).show();
        }

    }
}
```

### 2、点击read按钮

```java
//点击read按钮：读取卡片中的信息，并显示到infoText中
        mReadBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //弹出ReadDialog
                mReadDialog = new ReadDialog();
                mReadDialog.showNow(getSupportFragmentManager(),"ReadDialog");
                mReadDialog.getDialog().setCancelable(false);
                isRead=true;
            }});
```

### 3、当标签靠近触发activity的`onNewIntent()`

```java
@Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        mTag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
        //判断类型
        String Type = NfcUtil.supportedTechs(mTag.getTechList());
        //正在读
        if(isRead){
            mInfoText.setText("数据类型为："+Type+"\n");
            if(Type.equals("Ndef")){  NdefRead();   }
            if(Type.equals("MifareClassic")){   MifareRead();   }
            //设置Write按钮可点击
            mWriteBtn.setEnabled(true);
        }

        //正在写
        if (isWrite){
            if(Type.equals("Ndef")){     NdefWrite();  }
            if(Type.equals("MifareClassic")){   MifareWrite();   }
            mWriteBtn.setEnabled(false);
        }
    }
```

- **Ndef数据读**

```java
private void NdefRead(){
        isNdef = true;
        Ndef ndef = Ndef.get(mTag);
        try {
            ndef.connect();
            NdefMessage ndefMessage = ndef.getNdefMessage();
            if (ndefMessage.getRecords().length == 3) {
                String messageId = new String(ndefMessage.getRecords()[0].getPayload(),"UTF-8");
                String messageOwner = new String(ndefMessage.getRecords()[1].getPayload(),"UTF-8");
                String messageOwnerPhone = new String(ndefMessage.getRecords()[2].getPayload(),"UTF-8");
                mInfoText.append("姓名："+messageId+"\n");
                mInfoText.append("学号："+messageOwner+"\n");
                mInfoText.append("总成绩"+messageOwnerPhone+"\n");
            }
            ndef.close();
        } catch (FormatException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        isRead=false;
        mReadDialog.dismiss();  //关闭弹窗
    }
```

- **MifareClassic数据读**

```java
private void MifareRead(){
        isMifareClassic = true;
        String[] info = NfcUtil.read(mTag); //读取Nfc
        for(int i=1;i<11;i++){
            setInfoText(i,info[i]);
        }
        isRead=false;
        mReadDialog.dismiss();  //关闭弹窗
    }
```

- **Ndef数据写**

```java
private void NdefWrite(){
        isNdef = true;
        Ndef ndef = Ndef.get(mTag);
        if (ndef != null) {
            try {
                ndef.connect();
                NdefRecord mimeRecord1 = NdefRecord.createMime("CSU", mName.getBytes(Charset.forName("UTF-8")));
                NdefRecord mimeRecord2 = NdefRecord.createMime("CSU", mId.getBytes(Charset.forName("UTF-8")));
                NdefRecord mimeRecord3 = NdefRecord.createMime("CSU", mGrade.getBytes(Charset.forName("UTF-8")));
                mInfoText.setText("姓名："+mName+"\n");
                mInfoText.append("学号："+mId+"\n");
                mInfoText.append("总成绩"+mGrade+"\n");
                ndef.writeNdefMessage(new NdefMessage(mimeRecord1,mimeRecord2,mimeRecord3));
                ndef.close();
            } catch ( Exception e) {
                e.printStackTrace();
            }
        }
        isWrite=false;
        isNdef=false;
        mReadDialog.dismiss();  //关闭弹窗
    }
```

- **MifareClassic数据写**

```java
private void MifareWrite(){
        isMifareClassic = true;
        if(isWrite){    //正在写
            NfcUtil.write(mTag,mStudent);
            setInfoText(mStudent);
            isWrite=false;
            isMifareClassic=false;
            mReadDialog.dismiss();  //关闭弹窗
        }
    }
```

# 五、参考资料

### ndef、NdefMessage和NedfRecord

[Ndef - Android中文版 - API参考文档 (apiref.com)](https://www.apiref.com/android-zh/android/nfc/tech/Ndef.html)

[NdefRecord - Android中文版 - API参考文档 (apiref.com)](https://www.apiref.com/android-zh/android/nfc/NdefRecord.html)

[NdefMessage - Android中文版 - API参考文档 (apiref.com)](https://www.apiref.com/android-zh/android/nfc/NdefMessage.html#NdefMessage(byte[]))

### 视频课程

[NFC 标签调度系统_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1R7411C7kS?p=15&vd_source=592e40e3e456cbca5e66df60b04bf2d3)

### 实战项目

[(26条消息) Android NFC技术（三）——初次开发Android NFC你须知道NdefMessage和NdefRecord](https://blog.csdn.net/qq_26787115/article/details/50831582)

[(31条消息) android nfc中MifareClassic格式的读写_Coding-lover的博客-CSDN博客](https://blog.csdn.net/coslay/article/details/25075595)

### 安卓版本的NFC小工具

NFC标签助手

<img src="/images/myNFC/88162883639770466-1685255179109-3.jpg" alt="88162883639770466" style="zoom: 33%;" />

### 硬件知识

[ID卡、IC卡、RFID卡、NFC卡、Mifare卡各种概念的关系 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/344426747)
