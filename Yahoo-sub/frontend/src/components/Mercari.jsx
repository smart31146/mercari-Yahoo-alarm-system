import React, { useState,useEffect  } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { TextField } from '@material-ui/core';
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { MenuProps, useStyles, options, statusoptions } from "./utils";
import {Button} from "@material-ui/core";

const Mercari = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
      Title: '',
      category: '',
      keyword: '',
      expkeyword: '',
      minprice: 300,
      maxprice: 99999999
    });

    const [statusSelected, setstatusSelected] = useState([]);
    const statusisAllSelected = options.length > 0 && statusSelected.length === options.length;
    
    const statusHandleChange = (event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all") {
            setstatusSelected(statusSelected.length === options.length ? [] : options);
            return;
        }
        setstatusSelected(value);
    };
  
    const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
    };

    const [list, setList] = useState([]);
    useEffect(() => {
        console.log("I have been mounted");
        let postData = [];
        if(localStorage.getItem('merData')) postData = JSON.parse(localStorage.getItem('merData'));

        let save = [];
        for(let i = 0 ; i < postData.length; i++) {
            save[i] = {Title: '', category: '', keyword: '', expkeyword: '', minprice: '', maxprice: '', status: []};
            save[i].Title = postData[i].Title;
            save[i].category = postData[i].category;
            save[i].keyword = postData[i].keyword;
            save[i].expkeyword = postData[i].expkeyword;
            save[i].minprice = postData[i].minprice;
            save[i].maxprice = postData[i].maxprice;
            save[i].status = postData[i].status;
        }
        console.log(save);
        setList(save);
      }, []);

    const conditionAdd = () => {
        if(values.Title === "" ) {alert("通知タイトルは必須です。"); return ;}
        if(values.keyword === "" ) {alert("検索キーワードを入力してください。"); return ;}
        if(values.category === "") {alert("カテゴリを入力してください。"); return ;}
        if(statusSelected.length === 0 ) {alert("製品の状態を選択してください。"); return ;}
        
        let tmp = {};
        console.log(values.category);
        tmp.Title = values.Title;
        tmp.category = values.category;
        tmp.status = statusSelected;
        tmp.keyword = values.keyword;
        tmp.expkeyword = values.expkeyword;
        tmp.minprice = values.minprice;
        tmp.maxprice = values.maxprice;
        let tmpAry = list;
        tmpAry.unshift(tmp);
        console.log(tmp);

        tmp = {
            Title: '',
            category: '',
            keyword: '',
            expkeyword: '',
            minprice: 300,
            maxprice: 99999999
        }
        setValues(tmp);
        setstatusSelected([]);
        setList(tmpAry);
        localStorage.setItem('merData', JSON.stringify(tmpAry));
    }

    const conditionDelete = (index) => {
        console.log(index);
        let tmp = list;
        tmp.splice(index, 1);
        setstatusSelected([]);
        setList(tmp);
        localStorage.setItem('merData', JSON.stringify(tmp));
    }

    const conditionEdit = (index) => {
        console.log(index);
        let tmp = list;
        let content = tmp[index];
        tmp.splice(index, 1);
        setList(tmp);
        localStorage.setItem('merData', JSON.stringify(tmp));

        let tmp2 = {keyword: content.keyword, Title: content.Title, expkeyword: content.expkeyword,
        minprice: content.minprice, maxprice: content.maxprice, category: content.category};
        setValues(tmp2);

        setstatusSelected(content.status);
    }
  
    return (
      <div className='Mer_tool'>
        <div className='tool-merCondition'>
            <FormControl variant="standard" className={classes.formControl}>
                <TextField 
                name='Title'
                id="outlined-basic" 
                label="通知タイトル" 
                variant="standard" 
                className={classes.margin}
                onChange={handleChange} 
                value={values.Title}/>
            </FormControl>

            <FormControl variant="standard" className={classes.formControl}>
            <TextField 
              name='keyword'
              id="outlined-basic" 
              label="検索キーワード入力" 
              variant="standard" 
              onChange={handleChange} 
              value={values.keyword}/>
              </FormControl>

          <FormControl variant="standard" className={classes.formControl}>
            
            <InputLabel id="demo-simple-select-outlined-label">カテゴリー入力</InputLabel>
            <Select
              name='category'
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={values.category}
              onChange={handleChange}
              label="カテゴリー入力"
            >
                    <MenuItem value="すべて">すべて</MenuItem>
                    <MenuItem value="レディース">レディース</MenuItem>
                    <MenuItem value="レディーストップス">レディーストップス</MenuItem>
                    <MenuItem value="レディースTシャツ/カットソー(半袖/袖なし)">レディースTシャツ/カットソー(半袖/袖なし)</MenuItem>
                    <MenuItem value="レディースTシャツ/カットソー(七分/長袖)">レディースTシャツ/カットソー(七分/長袖)</MenuItem>
                    <MenuItem value="レディースシャツ/ブラウス(半袖/袖なし)">レディースシャツ/ブラウス(半袖/袖なし)</MenuItem>
                    <MenuItem value="レディースシャツ/ブラウス(七分/長袖)">レディースシャツ/ブラウス(七分/長袖)</MenuItem>
                    <MenuItem value="レディースポロシャツ">レディースポロシャツ</MenuItem>
                    <MenuItem value="レディースキャミソール">レディースキャミソール</MenuItem>
                    <MenuItem value="レディースタンクトップ">レディースタンクトップ</MenuItem>
                    <MenuItem value="レディースホルターネック">レディースホルターネック</MenuItem>
                    <MenuItem value="レディースニット/セーター">レディースニット/セーター</MenuItem>
                    <MenuItem value="レディースチュニック">レディースチュニック</MenuItem>
                    <MenuItem value="レディースカーディガン/ボレロ">レディースカーディガン/ボレロ</MenuItem>
                    <MenuItem value="レディースアンサンブル">レディースアンサンブル</MenuItem>
                    <MenuItem value="レディースベスト/ジレ">レディースベスト/ジレ</MenuItem>
                    <MenuItem value="レディースパーカー">レディースパーカー</MenuItem>
                    <MenuItem value="レディーストレーナー/スウェット">レディーストレーナー/スウェット</MenuItem>
                    <MenuItem value="レディースベアトップ/チューブトップ">レディースベアトップ/チューブトップ</MenuItem>
                    <MenuItem value="レディースジャージ">レディースジャージ</MenuItem>
                    
                    <MenuItem value="レディースジャケット/アウター">レディースジャケット/アウター</MenuItem>
                    <MenuItem value="レディーステーラードジャケット">レディーステーラードジャケット</MenuItem>
                    <MenuItem value="レディースノーカラージャケット">レディースノーカラージャケット</MenuItem>
                    <MenuItem value="レディースGジャン/デニムジャケット">レディースGジャン/デニムジャケット</MenuItem>
                    <MenuItem value="レディースレザージャケット">レディースレザージャケット</MenuItem>
                    <MenuItem value="レディースダウンジャケット">レディースダウンジャケット</MenuItem>
                    <MenuItem value="レディースライダースジャケット">レディースライダースジャケット</MenuItem>
                    <MenuItem value="レディースミリタリージャケット">レディースミリタリージャケット</MenuItem>
                    <MenuItem value="レディースダウンベスト">レディースダウンベスト</MenuItem>
                    <MenuItem value="レディースジャンパー/ブルゾン">レディースジャンパー/ブルゾン</MenuItem>
                    <MenuItem value="レディースポンチョ">レディースポンチョ</MenuItem>
                    <MenuItem value="レディースロングコート">レディースロングコート</MenuItem>
                    <MenuItem value="レディーストレンチコート">レディーストレンチコート</MenuItem>
                    <MenuItem value="レディースダッフルコート">レディースダッフルコート</MenuItem>
                    <MenuItem value="レディースピーコート">レディースピーコート</MenuItem>
                    <MenuItem value="レディースチェスターコート">レディースチェスターコート</MenuItem>
                    <MenuItem value="レディースモッズコート">レディースモッズコート</MenuItem>
                    <MenuItem value="レディーススタジャン">レディーススタジャン</MenuItem>
                    <MenuItem value="レディース毛皮/ファーコート">レディース毛皮/ファーコート</MenuItem>
                    <MenuItem value="レディーススプリングコート">レディーススプリングコート</MenuItem>
                    <MenuItem value="レディーススカジャン">レディーススカジャン</MenuItem>
                    
                    <MenuItem value="レディースパンツ">レディースパンツ</MenuItem>
                    <MenuItem value="レディースデニム/ジーンズ">レディースデニム/ジーンズ</MenuItem>
                    <MenuItem value="レディースショートパンツ">レディースショートパンツ</MenuItem>
                    <MenuItem value="レディースカジュアルパンツ">レディースカジュアルパンツ</MenuItem>
                    <MenuItem value="レディースハーフパンツ">レディースハーフパンツ</MenuItem>
                    <MenuItem value="レディースチノパン">レディースチノパン</MenuItem>
                    <MenuItem value="レディースワークパンツ/カーゴパンツ">レディースワークパンツ/カーゴパンツ</MenuItem>
                    <MenuItem value="レディースクロップドパンツ">レディースクロップドパンツ</MenuItem>
                    <MenuItem value="レディースサロペット/オーバーオール">レディースサロペット/オーバーオール</MenuItem>
                    <MenuItem value="レディースオールインワン">レディースオールインワン</MenuItem>
                    <MenuItem value="レディースサルエルパンツ">レディースサルエルパンツ</MenuItem>
                    <MenuItem value="レディースガウチョパンツ">レディースガウチョパンツ</MenuItem>
                    
                    <MenuItem value="レディーススカート">レディーススカート</MenuItem>
                    <MenuItem value="ミニスカート">ミニスカート</MenuItem>
                    <MenuItem value="ひざ丈スカート">ひざ丈スカート</MenuItem>
                    <MenuItem value="ロングスカート">ロングスカート</MenuItem>
                    <MenuItem value="キュロット">キュロット</MenuItem>
                    
                    <MenuItem value="レディースワンピース">レディースワンピース</MenuItem>
                    <MenuItem value="ミニワンピース">ミニワンピース</MenuItem>
                    <MenuItem value="ひざ丈ワンピース">ひざ丈ワンピース</MenuItem>
                    <MenuItem value="ロングワンピース">ロングワンピース</MenuItem>
                    
                    <MenuItem value="レディース靴">レディース靴</MenuItem>
                    <MenuItem value="レディースハイヒール/パンプス">レディースハイヒール/パンプス</MenuItem>
                    <MenuItem value="レディースブーツ">レディースブーツ</MenuItem>
                    <MenuItem value="レディースサンダル">レディースサンダル</MenuItem>
                    <MenuItem value="レディーススニーカー">レディーススニーカー</MenuItem>
                    <MenuItem value="レディースミュール">レディースミュール</MenuItem>
                    <MenuItem value="レディースモカシン">レディースモカシン</MenuItem>
                    <MenuItem value="レディースローファー/革靴">レディースローファー/革靴</MenuItem>
                    <MenuItem value="レディースフラットシューズ/バレエシューズ">レディースフラットシューズ/バレエシューズ</MenuItem>
                    <MenuItem value="レディース長靴/レインシューズ">レディース長靴/レインシューズ</MenuItem>
                    
                    <MenuItem value="レディースルームウェア/パジャマ">レディースルームウェア/パジャマ</MenuItem>
                    <MenuItem value="レディースパジャマ">レディースパジャマ</MenuItem>
                    <MenuItem value="レディースルームウェア">レディースルームウェア</MenuItem>

                    <MenuItem value="レディースレッグウェア">レディースレッグウェア</MenuItem>
                    <MenuItem value="レディースソックス">レディースソックス</MenuItem>
                    <MenuItem value="レディーススパッツ/レギンス">レディーススパッツ/レギンス</MenuItem>
                    <MenuItem value="レディースストッキング/タイツ">レディースストッキング/タイツ</MenuItem>
                    <MenuItem value="レディースレッグウォーマー">レディースレッグウォーマー</MenuItem>

                    <MenuItem value="レディース帽子">レディース帽子</MenuItem>
                    <MenuItem value="レディースニットキャップ/ビーニー">レディースニットキャップ/ビーニー</MenuItem>
                    <MenuItem value="レディースハット">レディースハット</MenuItem>
                    <MenuItem value="レディースハンチング/ベレー帽">レディースハンチング/ベレー帽</MenuItem>
                    <MenuItem value="レディースキャップ">レディースキャップ</MenuItem>
                    <MenuItem value="レディースキャスケット">レディースキャスケット</MenuItem>
                    <MenuItem value="レディース麦わら帽子">レディース麦わら帽子</MenuItem>
                    
                    <MenuItem value="レディースバッグ">レディースバッグ</MenuItem>
                    <MenuItem value="レディースハンドバッグ">レディースハンドバッグ</MenuItem>
                    <MenuItem value="レディーストートバッグ">レディーストートバッグ</MenuItem>
                    <MenuItem value="レディースエコバッグ">レディースエコバッグ</MenuItem>
                    <MenuItem value="レディースリュック/バックパック">レディースリュック/バックパック</MenuItem>
                    <MenuItem value="レディースボストンバッグ">レディースボストンバッグ</MenuItem>
                    <MenuItem value="レディーススポーツバッグ">レディーススポーツバッグ</MenuItem>
                    <MenuItem value="レディースショルダーバッグ">レディースショルダーバッグ</MenuItem>
                    <MenuItem value="レディースクラッチバッグ">レディースクラッチバッグ</MenuItem>
                    <MenuItem value="レディースポーチ/バニティ">レディースポーチ/バニティ</MenuItem>
                    <MenuItem value="レディースボディバッグ/ウェストバッグ">レディースボディバッグ/ウェストバッグ</MenuItem>
                    <MenuItem value="レディースマザーズバッグ">レディースマザーズバッグ</MenuItem>
                    <MenuItem value="レディースメッセンジャーバッグ">レディースメッセンジャーバッグ</MenuItem>
                    <MenuItem value="レディースビジネスバッグ">レディースビジネスバッグ</MenuItem>
                    <MenuItem value="レディース旅行用バッグ/キャリーバッグ">レディース旅行用バッグ/キャリーバッグ</MenuItem>
                    <MenuItem value="レディースショップ袋">レディースショップ袋</MenuItem>
                    <MenuItem value="レディース和装用バッグ">レディース和装用バッグ</MenuItem>
                    <MenuItem value="レディースかごバッグ">レディースかごバッグ</MenuItem>

                    <MenuItem value="レディースアクセサリー">レディースアクセサリー</MenuItem>
                    <MenuItem value="レディースネックレス">レディースネックレス</MenuItem>
                    <MenuItem value="レディースブレスレット">レディースブレスレット</MenuItem>
                    <MenuItem value="レディースバングル/リストバンド">レディースバングル/リストバンド</MenuItem>
                    <MenuItem value="レディースリング">レディースリング</MenuItem>
                    <MenuItem value="レディースピアス(片耳用)">レディースピアス(片耳用)</MenuItem>
                    <MenuItem value="レディースピアス(両耳用)">レディースピアス(両耳用)</MenuItem>
                    <MenuItem value="レディースイヤリング">レディースイヤリング</MenuItem>
                    <MenuItem value="レディースアンクレット">レディースアンクレット</MenuItem>
                    <MenuItem value="レディースブローチ/コサージュ">レディースブローチ/コサージュ</MenuItem>
                    <MenuItem value="レディースチャーム">レディースチャーム</MenuItem>

                    <MenuItem value="レディースヘアアクセサリー">レディースヘアアクセサリー</MenuItem>
                    <MenuItem value="レディースヘアゴム/シュシュ">レディースヘアゴム/シュシュ</MenuItem>
                    <MenuItem value="レディースヘアバンド/カチューシャ">レディースヘアバンド/カチューシャ</MenuItem>
                    <MenuItem value="レディースヘアピン">レディースヘアピン</MenuItem>

                    <MenuItem value="レディース小物">レディース小物</MenuItem>
                    <MenuItem value="レディース長財布">レディース長財布</MenuItem>
                    <MenuItem value="レディース折り財布">レディース折り財布</MenuItem>
                    <MenuItem value="レディースコインケース/小銭入れ">レディースコインケース/小銭入れ</MenuItem>
                    <MenuItem value="レディース名刺入れ/定期入れ">レディース名刺入れ/定期入れ</MenuItem>
                    <MenuItem value="レディースキーケース">レディースキーケース</MenuItem>
                    <MenuItem value="レディースキーホルダー">レディースキーホルダー</MenuItem>
                    <MenuItem value="レディース手袋/アームカバー">レディース手袋/アームカバー</MenuItem>
                    <MenuItem value="レディースハンカチ">レディースハンカチ</MenuItem>
                    <MenuItem value="レディースベルト">レディースベルト</MenuItem>
                    <MenuItem value="レディースマフラー/ショール">レディースマフラー/ショール</MenuItem>
                    <MenuItem value="レディースストール/スヌード">レディースストール/スヌード</MenuItem>
                    <MenuItem value="レディースバンダナ/スカーフ">レディースバンダナ/スカーフ</MenuItem>
                    <MenuItem value="レディースネックウォーマー">レディースネックウォーマー</MenuItem>
                    <MenuItem value="レディースサスペンダー">レディースサスペンダー</MenuItem>
                    <MenuItem value="レディースサングラス/メガネ">レディースサングラス/メガネ</MenuItem>
                    <MenuItem value="レディースモバイルケース/カバー">レディースモバイルケース/カバー</MenuItem>
                    <MenuItem value="レディース手帳">レディース手帳</MenuItem>
                    <MenuItem value="レディースイヤマフラー">レディースイヤマフラー</MenuItem>
                    <MenuItem value="レディース傘">レディース傘</MenuItem>
                    <MenuItem value="レディースレインコート/ポンチョ">レディースレインコート/ポンチョ</MenuItem>
                    <MenuItem value="レディースミラー">レディースミラー</MenuItem>
                    <MenuItem value="レディースタバコグッズ">レディースタバコグッズ</MenuItem>

                    <MenuItem value="レディース時計">レディース時計</MenuItem>
                    <MenuItem value="レディース腕時計(アナログ)">レディース腕時計(アナログ)</MenuItem>
                    <MenuItem value="レディース腕時計(デジタル)">レディース腕時計(デジタル)</MenuItem>
                    <MenuItem value="レディースラバーベルト">レディースラバーベルト</MenuItem>
                    <MenuItem value="レディースレザーベルト">レディースレザーベルト</MenuItem>
                    <MenuItem value="レディース金属ベルト">レディース金属ベルト</MenuItem>

                    <MenuItem value="レディースウィッグ/エクステ">レディースウィッグ/エクステ</MenuItem>
                    <MenuItem value="前髪ウィッグ">前髪ウィッグ</MenuItem>
                    <MenuItem value="ロングストレート">ロングストレート</MenuItem>
                    <MenuItem value="ロングカール">ロングカール</MenuItem>
                    <MenuItem value="ショートストレート">ショートストレート</MenuItem>
                    <MenuItem value="ショートカール">ショートカール</MenuItem>

                    <MenuItem value="レディース浴衣/水着">レディース浴衣/水着</MenuItem>
                    <MenuItem value="レディース浴衣">レディース浴衣</MenuItem>
                    <MenuItem value="レディース着物">レディース着物</MenuItem>
                    <MenuItem value="レディース振袖">レディース振袖</MenuItem>
                    <MenuItem value="レディース長襦袢/半襦袢">レディース長襦袢/半襦袢</MenuItem>
                    <MenuItem value="レディース水着セパレート">レディース水着セパレート</MenuItem>
                    <MenuItem value="レディース水着ワンピース">レディース水着ワンピース</MenuItem>
                    <MenuItem value="レディース水着スポーツ用">レディース水着スポーツ用</MenuItem>

                    <MenuItem value="レディーススーツ/フォーマル/ドレス">レディーススーツ/フォーマル/ドレス</MenuItem>
                    <MenuItem value="スカートスーツ上下">スカートスーツ上下</MenuItem>
                    <MenuItem value="パンツスーツ上下">パンツスーツ上下</MenuItem>
                    <MenuItem value="ドレス">ドレス</MenuItem>
                    <MenuItem value="レディースパーティーバッグ">レディースパーティーバッグ</MenuItem>
                    <MenuItem value="レディースシューズ">レディースシューズ</MenuItem>
                    <MenuItem value="レディースウェディング">レディースウェディング</MenuItem>

                    <MenuItem value="マタニティ">マタニティ</MenuItem>
                    <MenuItem value="マタニティトップス">マタニティトップス</MenuItem>
                    <MenuItem value="マタニティアウター">マタニティアウター</MenuItem>
                    <MenuItem value="マタニティインナー">マタニティインナー</MenuItem>
                    <MenuItem value="マタニティワンピース">マタニティワンピース</MenuItem>
                    <MenuItem value="マタニティパンツ/スパッツ">マタニティパンツ/スパッツ</MenuItem>
                    <MenuItem value="マタニティスカート">マタニティスカート</MenuItem>
                    <MenuItem value="マタニティパジャマ">マタニティパジャマ</MenuItem>
                    <MenuItem value="マタニティ授乳服">マタニティ授乳服</MenuItem>


                    <MenuItem value="メンズ">メンズ</MenuItem>
                    <MenuItem value="メンズトップス">メンズトップス</MenuItem>
                    <MenuItem value="メンズTシャツ/カットソー(半袖/袖なし)">メンズTシャツ/カットソー(半袖/袖なし)</MenuItem>
                    <MenuItem value="メンズTシャツ/カットソー(七分/長袖)">メンズTシャツ/カットソー(七分/長袖)</MenuItem>
                    <MenuItem value="メンズシャツ">メンズシャツ</MenuItem>
                    <MenuItem value="メンズポロシャツ">メンズポロシャツ</MenuItem>
                    <MenuItem value="メンズタンクトップ">メンズタンクトップ</MenuItem>
                    <MenuItem value="メンズニット/セーター">メンズニット/セーター</MenuItem>
                    <MenuItem value="メンズパーカー">メンズパーカー</MenuItem>
                    <MenuItem value="メンズカーディガン">メンズカーディガン</MenuItem>
                    <MenuItem value="メンズスウェット">メンズスウェット</MenuItem>
                    <MenuItem value="メンズジャージ">メンズジャージ</MenuItem>
                    <MenuItem value="メンズベスト">メンズベスト</MenuItem>

                    <MenuItem value="メンズジャケット/アウター">メンズジャケット/アウター</MenuItem>
                    <MenuItem value="メンズテーラードジャケット">メンズテーラードジャケット</MenuItem>
                    <MenuItem value="メンズノーカラージャケット">メンズノーカラージャケット</MenuItem>
                    <MenuItem value="メンズGジャン/デニムジャケット">メンズGジャン/デニムジャケット</MenuItem>
                    <MenuItem value="メンズレザージャケット">メンズレザージャケット</MenuItem>
                    <MenuItem value="メンズダウンジャケット">メンズダウンジャケット</MenuItem>
                    <MenuItem value="メンズライダースジャケット">メンズライダースジャケット</MenuItem>
                    <MenuItem value="メンズミリタリージャケット">メンズミリタリージャケット</MenuItem>
                    <MenuItem value="メンズナイロンジャケット">メンズナイロンジャケット</MenuItem>
                    <MenuItem value="メンズフライトジャケット">メンズフライトジャケット</MenuItem>
                    <MenuItem value="メンズダッフルコート">メンズダッフルコート</MenuItem>
                    <MenuItem value="メンズピーコート">メンズピーコート</MenuItem>
                    <MenuItem value="メンズステンカラーコート">メンズステンカラーコート</MenuItem>
                    <MenuItem value="メンズトレンチコート">メンズトレンチコート</MenuItem>
                    <MenuItem value="メンズモッズコート">メンズモッズコート</MenuItem>
                    <MenuItem value="メンズチェスターコート">メンズチェスターコート</MenuItem>
                    <MenuItem value="メンズスタジャン">メンズスタジャン</MenuItem>
                    <MenuItem value="メンズスカジャン">メンズスカジャン</MenuItem>
                    <MenuItem value="メンズブルゾン">メンズブルゾン</MenuItem>
                    <MenuItem value="メンズマウンテンパーカー">メンズマウンテンパーカー</MenuItem>
                    <MenuItem value="メンズダウンベスト">メンズダウンベスト</MenuItem>
                    <MenuItem value="メンズポンチョ">メンズポンチョ</MenuItem>
                    <MenuItem value="メンズカバーオール">メンズカバーオール</MenuItem>
                    
                    <MenuItem value="メンズパンツ">メンズパンツ</MenuItem>
                    <MenuItem value="メンズデニム/ジーンズ">メンズデニム/ジーンズ</MenuItem>
                    <MenuItem value="ワークパンツ/カーゴパンツメンズ">ワークパンツ/カーゴパンツメンズ</MenuItem>
                    <MenuItem value="メンズスラックス">メンズスラックス</MenuItem>
                    <MenuItem value="メンズチノパン">メンズチノパン</MenuItem>
                    <MenuItem value="メンズショートパンツ">メンズショートパンツ</MenuItem>
                    <MenuItem value="メンズペインターパンツ">メンズペインターパンツ</MenuItem>
                    <MenuItem value="メンズサルエルパンツ">メンズサルエルパンツ</MenuItem>
                    <MenuItem value="メンズオーバーオール">メンズオーバーオール</MenuItem>

                    <MenuItem value="メンズ靴">メンズ靴</MenuItem>
                    <MenuItem value="メンズスニーカー">メンズスニーカー</MenuItem>
                    <MenuItem value="メンズサンダル">メンズサンダル</MenuItem>
                    <MenuItem value="メンズブーツ">メンズブーツ</MenuItem>
                    <MenuItem value="メンズモカシン">メンズモカシン</MenuItem>
                    <MenuItem value="メンズドレス/ビジネス">メンズドレス/ビジネス</MenuItem>
                    <MenuItem value="メンズ長靴/レインシューズ">メンズ長靴/レインシューズ</MenuItem>
                    <MenuItem value="メンズデッキシューズ">メンズデッキシューズ</MenuItem>

                    <MenuItem value="メンズバッグ">メンズバッグ</MenuItem>
                    <MenuItem value="メンズショルダーバッグ">メンズショルダーバッグ</MenuItem>
                    <MenuItem value="メンズトートバッグ">メンズトートバッグ</MenuItem>
                    <MenuItem value="メンズボストンバッグ">メンズボストンバッグ</MenuItem>
                    <MenuItem value="メンズリュック/バックパック">メンズリュック/バックパック</MenuItem>
                    <MenuItem value="メンズウエストポーチ">メンズウエストポーチ</MenuItem>
                    <MenuItem value="メンズボディーバッグ">メンズボディーバッグ</MenuItem>
                    <MenuItem value="メンズドラムバッグ">メンズドラムバッグ</MenuItem>
                    <MenuItem value="メンズビジネスバッグ">メンズビジネスバッグ</MenuItem>
                    <MenuItem value="メンズトラベルバッグ">メンズトラベルバッグ</MenuItem>
                    <MenuItem value="メンズメッセンジャーバッグ">メンズメッセンジャーバッグ</MenuItem>
                    <MenuItem value="メンズエコバッグ">メンズエコバッグ</MenuItem>

                    <MenuItem value="メンズスーツ">メンズスーツ</MenuItem>
                    <MenuItem value="メンズスーツジャケット">メンズスーツジャケット</MenuItem>
                    <MenuItem value="メンズスーツベスト">メンズスーツベスト</MenuItem>
                    <MenuItem value="メンズスラックス">メンズスラックス</MenuItem>
                    <MenuItem value="メンズセットアップ">メンズセットアップ</MenuItem>

                    <MenuItem value="メンズ帽子">メンズ帽子</MenuItem>
                    <MenuItem value="メンズキャップ">メンズキャップ</MenuItem>
                    <MenuItem value="メンズハット">メンズハット</MenuItem>
                    <MenuItem value="メンズニットキャップ/ビーニー">メンズニットキャップ/ビーニー</MenuItem>
                    <MenuItem value="メンズハンチング/ベレー帽">メンズハンチング/ベレー帽</MenuItem>
                    <MenuItem value="メンズキャスケット">メンズキャスケット</MenuItem>
                    <MenuItem value="メンズサンバイザー">メンズサンバイザー</MenuItem>

                    <MenuItem value="メンズアクセサリー">メンズアクセサリー</MenuItem>
                    <MenuItem value="メンズネックレス">メンズネックレス</MenuItem>
                    <MenuItem value="メンズブレスレット">メンズブレスレット</MenuItem>
                    <MenuItem value="メンズバングル/リストバンド">メンズバングル/リストバンド</MenuItem>
                    <MenuItem value="メンズリング">メンズリング</MenuItem>
                    <MenuItem value="メンズピアス(片耳用)">メンズピアス(片耳用)</MenuItem>
                    <MenuItem value="メンズピアス(両耳用)">メンズピアス(両耳用)</MenuItem>
                    <MenuItem value="メンズアンクレット">メンズアンクレット</MenuItem>

                    <MenuItem value="メンズ小物">メンズ小物</MenuItem>
                    <MenuItem value="メンズ長財布">メンズ長財布</MenuItem>
                    <MenuItem value="メンズ折り財布">メンズ折り財布</MenuItem>
                    <MenuItem value="メンズマネークリップ">メンズマネークリップ</MenuItem>
                    <MenuItem value="メンズコインケース/小銭入れ">メンズコインケース/小銭入れ</MenuItem>
                    <MenuItem value="メンズ名刺入れ/定期入れ">メンズ名刺入れ/定期入れ</MenuItem>
                    <MenuItem value="メンズキーケース">メンズキーケース</MenuItem>
                    <MenuItem value="メンズキーホルダー">メンズキーホルダー</MenuItem>
                    <MenuItem value="メンズネクタイ">メンズネクタイ</MenuItem>
                    <MenuItem value="メンズ手袋">メンズ手袋</MenuItem>
                    <MenuItem value="メンズハンカチ">メンズハンカチ</MenuItem>
                    <MenuItem value="メンズベルト">メンズベルト</MenuItem>
                    <MenuItem value="メンズマフラー">メンズマフラー</MenuItem>
                    <MenuItem value="メンズストール">メンズストール</MenuItem>
                    <MenuItem value="メンズバンダナ">メンズバンダナ</MenuItem>
                    <MenuItem value="メンズネックウォーマー">メンズネックウォーマー</MenuItem>
                    <MenuItem value="メンズサスペンダー">メンズサスペンダー</MenuItem>
                    <MenuItem value="メンズウォレットチェーン">メンズウォレットチェーン</MenuItem>
                    <MenuItem value="メンズサングラス/メガネ">メンズサングラス/メガネ</MenuItem>
                    <MenuItem value="メンズモバイルケース/カバー">メンズモバイルケース/カバー</MenuItem>
                    <MenuItem value="メンズ手帳">メンズ手帳</MenuItem>
                    <MenuItem value="メンズストラップ">メンズストラップ</MenuItem>
                    <MenuItem value="メンズネクタイピン">メンズネクタイピン</MenuItem>
                    <MenuItem value="メンズカフリンクス">メンズカフリンクス</MenuItem>
                    <MenuItem value="メンズイヤマフラー">メンズイヤマフラー</MenuItem>
                    <MenuItem value="メンズ傘">メンズ傘</MenuItem>
                    <MenuItem value="メンズレインコート">メンズレインコート</MenuItem>
                    <MenuItem value="メンズミラー">メンズミラー</MenuItem>
                    <MenuItem value="メンズタバコグッズ">メンズタバコグッズ</MenuItem>

                    <MenuItem value="メンズ時計">メンズ時計</MenuItem>
                    <MenuItem value="メンズ腕時計(アナログ)">メンズ腕時計(アナログ)</MenuItem>
                    <MenuItem value="メンズ腕時計(デジタル)">メンズ腕時計(デジタル)</MenuItem>
                    <MenuItem value="メンズラバーベルト">メンズラバーベルト</MenuItem>
                    <MenuItem value="メンズレザーベルト">メンズレザーベルト</MenuItem>
                    <MenuItem value="メンズ金属ベルト">メンズ金属ベルト</MenuItem>

                    <MenuItem value="メンズ水着">メンズ水着</MenuItem>
                    <MenuItem value="メンズ一般水着">メンズ一般水着</MenuItem>
                    <MenuItem value="メンズスポーツ用">メンズスポーツ用</MenuItem>
                    <MenuItem value="メンズアクセサリー">メンズアクセサリー</MenuItem>

                    <MenuItem value="メンズレッグウェア">メンズレッグウェア</MenuItem>
                    <MenuItem value="メンズソックス">メンズソックス</MenuItem>
                    <MenuItem value="メンズレギンス/スパッツ">メンズレギンス/スパッツ</MenuItem>
                    <MenuItem value="メンズレッグウォーマー">メンズレッグウォーマー</MenuItem>

                    <MenuItem value="メンズアンダーウェア">メンズアンダーウェア</MenuItem>
                    <MenuItem value="メンズトランクス">メンズトランクス</MenuItem>
                    <MenuItem value="メンズボクサーパンツ">メンズボクサーパンツ</MenuItem>

                    <MenuItem value="ベビー・キッズ">ベビー・キッズ</MenuItem>
                    <MenuItem value="ベビー服(女の子用)~95cm">ベビー服(女の子用) ~95cm</MenuItem>
                    <MenuItem value="ベビー服(男の子用)~95cm">ベビー服(男の子用) ~95cm</MenuItem>
                    <MenuItem value="ベビー服(男女兼用)~95cm">ベビー服(男女兼用) ~95cm</MenuItem>
                    <MenuItem value="キッズ服(女の子用)100cm~">キッズ服(女の子用) 100cm~</MenuItem>
                    <MenuItem value="キッズ服(男の子用)100cm~">キッズ服(男の子用) 100cm~</MenuItem>
                    <MenuItem value="キッズ服(男女兼用)100cm~">キッズ服(男女兼用) 100cm~</MenuItem>
                    <MenuItem value="キッズ靴">キッズ靴</MenuItem>
                    <MenuItem value="子ども用ファッション小物">子ども用ファッション小物</MenuItem>
                    <MenuItem value="おむつ/トイレ/バス">おむつ/トイレ/バス</MenuItem>
                    <MenuItem value="外出/移動用品">外出/移動用品</MenuItem>
                    <MenuItem value="授乳/食事">授乳/食事</MenuItem>
                    <MenuItem value="ベビー家具/寝具/室内用品">ベビー家具/寝具/室内用品</MenuItem>
                    <MenuItem value="おもちゃ">おもちゃ</MenuItem>
                    <MenuItem value="行事/記念品">行事/記念品</MenuItem>
                    <MenuItem value="インテリア・住まい・小物">インテリア・住まい・小物</MenuItem>
                    <MenuItem value="キッチン/食器">キッチン/食器</MenuItem>
                    <MenuItem value="ベッド/マットレス">ベッド/マットレス</MenuItem>
                    <MenuItem value="ソファ/ソファベッド">ソファ/ソファベッド</MenuItem>
                    <MenuItem value="椅子/チェア">椅子/チェア</MenuItem>
                    <MenuItem value="机/テーブル">机/テーブル</MenuItem>
                    <MenuItem value="収納家具">収納家具</MenuItem>
                    <MenuItem value="ラグ/カーペット/マット">ラグ/カーペット/マット</MenuItem>
                    <MenuItem value="カーテン/ブラインド">カーテン/ブラインド</MenuItem>
                    <MenuItem value="ライト/照明">ライト/照明</MenuItem>
                    <MenuItem value="寝具">寝具</MenuItem>
                    <MenuItem value="インテリア小物">インテリア小物</MenuItem>
                    <MenuItem value="季節/年中行事">季節/年中行事</MenuItem>
                    <MenuItem value="本・音楽・ゲーム">本・音楽・ゲーム</MenuItem>
                    <MenuItem value="本">本</MenuItem>
                    <MenuItem value="漫画">漫画</MenuItem>
                    <MenuItem value="雑誌">雑誌</MenuItem>
                    <MenuItem value="CD">CD</MenuItem>
                    <MenuItem value="DVD/ブルーレイ">DVD/ブルーレイ</MenuItem>
                    <MenuItem value="レコード">レコード</MenuItem>
                    <MenuItem value="テレビゲーム">テレビゲーム</MenuItem>
                    <MenuItem value="おもちゃ・ホビー・グッズ">おもちゃ・ホビー・グッズ</MenuItem>
                    <MenuItem value="おもちゃ">おもちゃ</MenuItem>
                    <MenuItem value="タレントグッズ">タレントグッズ</MenuItem>
                    <MenuItem value="コミック/アニメグッズ">コミック/アニメグッズ</MenuItem>
                    <MenuItem value="トレーディングカード">トレーディングカード</MenuItem>
                    <MenuItem value="フィギュア">フィギュア</MenuItem>
                    <MenuItem value="楽器/器材">楽器/器材</MenuItem>
                    <MenuItem value="コレクション">コレクション</MenuItem>
                    <MenuItem value="ミリタリー">ミリタリー</MenuItem>
                    <MenuItem value="美術品">美術品</MenuItem>
                    <MenuItem value="アート用品">アート用品</MenuItem>
                    <MenuItem value="コスメ・香水・美容">コスメ・香水・美容
                    </MenuItem>
                    <MenuItem value="ベースメイク">ベースメイク</MenuItem>
                    <MenuItem value="メイクアップ">メイクアップ</MenuItem>
                    <MenuItem value="ネイルケア">ネイルケア</MenuItem>
                    <MenuItem value="香水">香水</MenuItem>
                    <MenuItem value="スキンケア/基礎化粧品">スキンケア/基礎化粧品</MenuItem>
                    <MenuItem value="ヘアケア">ヘアケア
                    </MenuItem>
                    <MenuItem value="ボディケア">ボディケア</MenuItem>
                    <MenuItem value="オーラルケア">オーラルケア</MenuItem>
                    <MenuItem value="リラクゼーション">リラクゼーション</MenuItem>
                    <MenuItem value="ダイエット">ダイエット</MenuItem>
                    <MenuItem value="家電・スマホ・カメラ">家電・スマホ・カメラ</MenuItem>
                    <MenuItem value="スマートフォン/携帯電話">スマートフォン/携帯電話
                    </MenuItem>
                    <MenuItem value="スマホアクセサリー">スマホアクセサリー</MenuItem>
                    <MenuItem value="PC/タブレット">PC/タブレット</MenuItem>
                    <MenuItem value="カメラ">カメラ</MenuItem>
                    <MenuItem value="テレビ/映像機器">テレビ/映像機器</MenuItem>
                    <MenuItem value="オーディオ機器">オーディオ機器</MenuItem>
                    <MenuItem value="美容/健康">美容/健康
                    </MenuItem>
                    <MenuItem value="冷暖房/空調">冷暖房/空調</MenuItem>
                    <MenuItem value="生活家電">生活家電</MenuItem>
                    <MenuItem value="スポーツ・レジャー">スポーツ・レジャー</MenuItem>
                    <MenuItem value="ゴルフ">ゴルフ</MenuItem>
                    <MenuItem value="フィッシング">フィッシング</MenuItem>
                    <MenuItem value="自転車">自転車
                    </MenuItem>
                    <MenuItem value="トレーニング/エクササイズ">トレーニング/エクササイズ</MenuItem>
                    <MenuItem value="野球">野球</MenuItem>
                    <MenuItem value="サッカー/フットサル">サッカー/フットサル</MenuItem>
                    <MenuItem value="テニス">テニス</MenuItem>
                    <MenuItem value="スノーボード">スノーボード</MenuItem>
                    <MenuItem value="スキー">スキー
                    </MenuItem>
                    <MenuItem value="アウトドア">アウトドア</MenuItem>
                    <MenuItem value="ハンドメイド">ハンドメイド</MenuItem>
                    <MenuItem value="アクセサリー(女性用)">アクセサリー(女性用)</MenuItem>
                    <MenuItem value="ファッション/小物">ファッション/小物</MenuItem>
                    <MenuItem value="アクセサリー/時計">アクセサリー/時計
                    </MenuItem>
                    <MenuItem value="日用品/インテリア">日用品/インテリア</MenuItem>
                    <MenuItem value="趣味/おもちゃ">趣味/おもちゃ</MenuItem>
                    <MenuItem value="キッズ/ベビー">キッズ/ベビー</MenuItem>
                    <MenuItem value="素材/材料">素材/材料</MenuItem>
                    <MenuItem value="チケット">チケット</MenuItem>
                    <MenuItem value="音楽">音楽
                    </MenuItem>
                    <MenuItem value="スポーツ">スポーツ</MenuItem>
                    <MenuItem value="演劇/芸能">演劇/芸能</MenuItem>
                    <MenuItem value="イベント">イベント</MenuItem>
                    <MenuItem value="映画">映画</MenuItem>
                    <MenuItem value="施設利用券">施設利用券</MenuItem>
                    <MenuItem value="優待券/割引券">優待券/割引券
                    </MenuItem>
                    <MenuItem value="自動車・オートバイ">自動車・オートバイ</MenuItem>
                    <MenuItem value="自動車本体">自動車本体</MenuItem>
                    <MenuItem value="自動車タイヤ/ホイール">自動車タイヤ/ホイール</MenuItem>
                    <MenuItem value="自動車パーツ">自動車パーツ</MenuItem>
                    <MenuItem value="自動車アクセサリー">自動車アクセサリー</MenuItem>
                    <MenuItem value="オートバイ車体">オートバイ車体
                    </MenuItem>
                    <MenuItem value="オートバイパーツ">オートバイパーツ</MenuItem>
                    <MenuItem value="オートバイアクセサリー">オートバイアクセサリー</MenuItem>
                    <MenuItem value="その他">その他</MenuItem>
            </Select>
        </FormControl>

        <FormControl variant="standard" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label" >商品状態入力</InputLabel>
            <Select
                name='productStatus'
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                multiple
                value={statusSelected}
                onChange={statusHandleChange}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
                label="商品状態入力"
            >
                <MenuItem
                value="all"
                classes={{
                    root: statusisAllSelected ? classes.selectedAll : ""
                }}
                >
                <ListItemIcon>
                    <Checkbox
                    classes={{ indeterminate: classes.indeterminateColor }}
                    checked={statusisAllSelected}
                    indeterminate={
                        statusSelected.length > 0 && statusSelected.length < statusoptions.length
                    }
                    style={statusisAllSelected? {color:'blue'}: {}}
                    />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.selectAllText }}
                    primary="すべて"
                />
                </MenuItem>
                {statusoptions.map((option) => (
                <MenuItem key={option} value={option}>
                    <ListItemIcon>
                    <Checkbox checked={statusSelected.indexOf(option) > -1} 
                    style={statusSelected.indexOf(option) > -1? {color:"blue"}: {}}/>
                    </ListItemIcon>
                    <ListItemText primary={option} />
                </MenuItem>
                ))}
            </Select>
            {/* <InputLabel id="demo-simple-select-outlined-label">ブランド入力</InputLabel>
            <Select
                name='brand'
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                multiple
                value={selected}
                onChange={selectHandleChange}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
                label="ブランド入力"
            >
                <MenuItem
                value="all"
                classes={{
                    root: isAllSelected ? classes.selectedAll : ""
                }}
                >
                <ListItemIcon>
                    <Checkbox
                    classes={{ indeterminate: classes.indeterminateColor }}
                    checked={isAllSelected}
                    indeterminate={
                        selected.length > 0 && selected.length < options.length
                    }
                    style={isAllSelected? {color:'blue'}: {}}
                    />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.selectAllText }}
                    primary="すべて"
                />
                </MenuItem>
                {options.map((option) => (
                <MenuItem key={option} value={option}>
                    <ListItemIcon>
                    <Checkbox checked={selected.indexOf(option) > -1} 
                    style={selected.indexOf(option) > -1? {color:"blue"}: {}}/>
                    </ListItemIcon>
                    <ListItemText primary={option} />
                </MenuItem>
                ))}
            </Select> */}

            

            <TextField 
              name='expkeyword'
              id="outlined-basic" 
              label="除外キーワード入力" 
              variant="standard" 
              className={classes.margin}
              onChange={handleChange} 
              value={values.expkeyword}/>

              <TextField 
                name='minprice'
                type='number'
                inputProps={{ min:300, max:99999999 }}
                id="outlined-basic" 
                label="最小価格入力" 
                variant="standard" 
                className={classes.margin}
                value={values.minprice}
                onChange={(e) => {
                    let value = parseInt(e.target.value, 10);

                    if (value > 99999999) value = 99999999;
                    if (value < 300) value = 300;

                    setValues({ ...values, 'minprice': e.target.value });
                }}/>

                <TextField 
                    name='maxprice'
                    type='number'
                    inputProps={{ min:300, max:99999999 }}
                    id="outlined-basic" 
                    label="最大価格入力" 
                    variant="standard" 
                    className={classes.margin}
                    value={values.maxprice}
                    onChange={(e) => {
                    let value = parseInt(e.target.value, 10);

                    if (value > 99999999) value = 99999999;
                    if (value < 300) value = 300;

                    setValues({ ...values, 'maxprice': e.target.value });
                }}/>

                <Button variant="contained" className={classes.button}  color="primary" onClick={conditionAdd}>追加</Button>
          </FormControl>
        </div>

        <div className='tool-merCondition-result'>
            <table className='merTable'>
                <thead>
                    <tr>
                        <th>番号</th>
                        <th>タイトル</th>
                        <th>キーワード</th>
                        <th>カテゴリー</th>
                        <th>商品状態</th>
                        <th>除外キーワード</th>
                        <th>価格帯</th>
                        <th>編集</th>
                        <th>削除</th>
                    </tr>
                </thead>
            
                <tbody className='resultDiv'>
                    {
                        list.map((item,key)=>
                        { return (
                            <tr key={key}>
                                <td>{key+1}</td>
                                <td>{item.Title}</td>
                                <td>{item.keyword}</td>
                                <td>{item.category}</td>
                                <td>{item.status}</td>
                                <td>{item.expkeyword}</td>
                                <td>{item.minprice+"円~"+item.maxprice+"円"}</td>
                                <td><button style={{width: '50px', border:'none', borderRadius: '3px', 
                                color: 'white',backgroundColor: 'blue' }} 
                                onClick={() => conditionEdit(key)}>編集</button></td>

                                <td>
                                <button style={{ width: '50px', border:'none', borderRadius: '3px', 
                                color: 'white',backgroundColor: 'red' }} 
                                onClick={() => conditionDelete(key)}>削除</button></td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
      </div>
    );
  };
  
  export default Mercari;
  