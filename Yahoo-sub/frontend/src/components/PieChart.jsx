import React, { useState,useEffect  } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { TextField } from '@material-ui/core';
import Merc from './Mercari';
import Yahoo from './Yahoo';
import axios from "axios";
import { MDBDataTable} from 'mdbreact';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import "bootstrap/dist/css/bootstrap.min.css";
import 'charts.css';
import './style.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formControlStop: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: '8vw',
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: "-5px",
    height: '58px',
    fontSize: '17px',
  },
}));

const PieChart = () => {
  const mymap = new Map();
  mymap.set("レディース", "1");
  mymap.set("レディーストップス", "11"); 
  mymap.set("レディースTシャツ/カットソー(半袖/袖なし)", "119"); 
  mymap.set("レディースTシャツ/カットソー(七分/長袖)", "120"); 
  mymap.set("レディースシャツ/ブラウス(半袖/袖なし)", "121");
  mymap.set("レディースシャツ/ブラウス(七分/長袖)", "122"); 
  mymap.set("レディースポロシャツ", "123"); 
  mymap.set("レディースキャミソール", "124"); 
  mymap.set("レディースタンクトップ", "125");
  mymap.set("レディースホルターネック", "126"); 
  mymap.set("レディースニット/セーター", "127"); 
  mymap.set("レディースチュニック", "128"); 
  mymap.set("レディースカーディガン/ボレロ", "129");
  mymap.set("レディースアンサンブル", "130"); 
  mymap.set("レディースベスト/ジレ", "131");
  mymap.set("レディースパーカー", "132");
  mymap.set("レディーストレーナー/スウェット", "133");
  mymap.set("レディースベアトップ/チューブトップ", "134");
  mymap.set("レディースジャージ", "135");

  mymap.set("レディースジャケット/アウター", "12"); 
  mymap.set("レディーステーラードジャケット", "137");
  mymap.set("レディースノーカラージャケット", "138");
  mymap.set("レディースGジャン/デニムジャケット", "139");
  mymap.set("レディースレザージャケット", "140");
  mymap.set("レディースダウンジャケット", "141");
  mymap.set("レディースライダースジャケット", "142"); 
  mymap.set("レディースミリタリージャケット", "143"); 
  mymap.set("レディースダウンベスト", "144"); 
  mymap.set("レディースジャンパー/ブルゾン", "145"); 
  mymap.set("レディースポンチョ", "146");
  mymap.set("レディースロングコート", "149"); 
  mymap.set("レディーストレンチコート", "150"); 
  mymap.set("レディースダッフルコート", "151"); 
  mymap.set("レディースピーコート", "152"); 
  mymap.set("レディースチェスターコート", "1129");
  mymap.set("レディースモッズコート", "1149"); 
  mymap.set("レディーススタジャン", "147"); 
  mymap.set("レディース毛皮/ファーコート", "153"); 
  mymap.set("レディーススプリングコート", "154"); 
  mymap.set("レディーススカジャン", "148");

  
  mymap.set("レディースパンツ", "13"); 
  mymap.set("レディースデニム/ジーンズ", "156"); 
  mymap.set("レディースショートパンツ", "157"); 
  mymap.set("レディースカジュアルパンツ", "158"); 
  mymap.set("レディースハーフパンツ", "159"); 
  mymap.set("レディースチノパン", "160"); 
  mymap.set("レディースワークパンツ/カーゴパンツ", "161"); 
  mymap.set("レディースクロップドパンツ", "162"); 
  mymap.set("レディースサロペット/オーバーオール", "163"); 
  mymap.set("レディースオールインワン", "164"); 
  mymap.set("レディースサルエルパンツ", "165"); 
  mymap.set("レディースガウチョパンツ", "1128"); 
  
  mymap.set("レディーススカート", "14");
  mymap.set("ミニスカート", "167"); 
  mymap.set("ひざ丈スカート", "168"); 
  mymap.set("ロングスカート", "169"); 
  mymap.set("キュロット", "170"); 
  
  mymap.set("レディースワンピース", "1");
  mymap.set("ミニワンピース", "172"); 
  mymap.set("ひざ丈ワンピース", "173"); 
  mymap.set("ロングワンピース", "174"); 
  
  mymap.set("レディース靴", "16");
  mymap.set("レディースハイヒール/パンプス", "176"); 
  mymap.set("レディースブーツ", "177"); 
  mymap.set("レディースサンダル", "178"); 
  mymap.set("レディーススニーカー", "179"); 
  mymap.set("レディースミュール", "180"); 
  mymap.set("レディースモカシン", "181"); 
  mymap.set("レディースローファー/革靴", "182"); 
  mymap.set("レディースフラットシューズ/バレエシューズ", "183"); 
  mymap.set("レディース長靴/レインシューズ", "184"); 
  
  mymap.set("レディースルームウェア/パジャマ", "17");
  mymap.set("レディースパジャマ", "186"); 
  mymap.set("レディースルームウェア", "190"); 

  mymap.set("レディースレッグウェア", "18");
  mymap.set("レディースソックス", "196"); 
  mymap.set("レディーススパッツ/レギンス", "197"); 
  mymap.set("レディースストッキング/タイツ", "198"); 
  mymap.set("レディースレッグウォーマー", "199"); 

  mymap.set("レディース帽子", "19");
  mymap.set("レディースニットキャップ/ビーニー", "201"); 
  mymap.set("レディースハット", "202"); 
  mymap.set("レディースハンチング/ベレー帽", "203"); 
  mymap.set("レディースキャップ", "204"); 
  mymap.set("レディースキャスケット", "205"); 
  mymap.set("レディース麦わら帽子", "206"); 
  
  mymap.set("レディースバッグ", "20");
  mymap.set("レディースハンドバッグ", "208"); 
  mymap.set("レディーストートバッグ", "209"); 
  mymap.set("レディースエコバッグ", "210"); 
  mymap.set("レディースリュック/バックパック", "211"); 
  mymap.set("レディースボストンバッグ", "212"); 
  mymap.set("レディーススポーツバッグ", "213"); 
  mymap.set("レディースショルダーバッグ", "214"); 
  mymap.set("レディースクラッチバッグ", "215"); 
  mymap.set("レディースポーチ/バニティ", "216"); 
  mymap.set("レディースボディバッグ/ウェストバッグ", "217"); 
  mymap.set("レディースマザーズバッグ", "218"); 
  mymap.set("レディースメッセンジャーバッグ", "219"); 
  mymap.set("レディースビジネスバッグ", "220"); 
  mymap.set("レディース旅行用バッグ/キャリーバッグ", "221"); 
  mymap.set("レディースショップ袋", "222"); 
  mymap.set("レディース和装用バッグ", "223"); 
  mymap.set("レディースかごバッグ", "224");

  mymap.set("レディースアクセサリー", "21");
  mymap.set("レディースネックレス", "226"); 
  mymap.set("レディースブレスレット", "227"); 
  mymap.set("レディースバングル/リストバンド", "228"); 
  mymap.set("レディースリング", "229"); 
  mymap.set("レディースピアス(片耳用)", "230"); 
  mymap.set("レディースピアス(両耳用)", "231"); 
  mymap.set("レディースイヤリング", "232"); 
  mymap.set("レディースアンクレット", "233"); 
  mymap.set("レディースブローチ/コサージュ", "234"); 
  mymap.set("レディースチャーム", "235"); 

  mymap.set("レディースヘアアクセサリー", "22");
  mymap.set("レディースヘアゴム/シュシュ", "237"); 
  mymap.set("レディースヘアバンド/カチューシャ", "238"); 
  mymap.set("レディースヘアピン", "239"); 

  mymap.set("レディース小物", "23");
  mymap.set("レディース長財布", "241"); 
  mymap.set("レディース折り財布", "242"); 
  mymap.set("レディースコインケース/小銭入れ", "243"); 
  mymap.set("レディース名刺入れ/定期入れ", "244"); 
  mymap.set("レディースキーケース", "245"); 
  mymap.set("レディースキーホルダー", "246"); 
  mymap.set("レディース手袋/アームカバー", "247"); 
  mymap.set("レディースハンカチ", "248"); 
  mymap.set("レディースベルト", "249"); 
  mymap.set("レディースマフラー/ショール", "250"); 
  mymap.set("レディースストール/スヌード", "251"); 
  mymap.set("レディースバンダナ/スカーフ", "252"); 
  mymap.set("レディースネックウォーマー", "253"); 
  mymap.set("レディースサスペンダー", "254"); 
  mymap.set("レディースサングラス/メガネ", "255"); 
  mymap.set("レディースモバイルケース/カバー", "257"); 
  mymap.set("レディース手帳", "258"); 
  mymap.set("レディースイヤマフラー", "259"); 
  mymap.set("レディース傘", "260"); 
  mymap.set("レディースレインコート/ポンチョ", "261"); 
  mymap.set("レディースミラー", "262"); 
  mymap.set("レディースタバコグッズ", "263"); 

  mymap.set("レディース時計", "24");
  mymap.set("レディース腕時計(アナログ)", "265"); 
  mymap.set("レディース腕時計(デジタル)", "266"); 
  mymap.set("レディースラバーベルト", "267"); 
  mymap.set("レディースレザーベルト", "268"); 
  mymap.set("レディース金属ベルト", "269"); 

mymap.set("レディースウィッグ/エクステ", "25");
mymap.set("前髪ウィッグ", "271"); 
mymap.set("ロングストレート", "272"); 
mymap.set("ロングカール", "273"); 
mymap.set("ショートストレート", "274"); 
mymap.set("ショートカール", "275"); 

mymap.set("レディース浴衣/水着", "26");
mymap.set("レディース浴衣", "277"); 
mymap.set("レディース着物", "279"); 
mymap.set("レディース振袖", "280"); 
mymap.set("レディース長襦袢/半襦袢", "281"); 
mymap.set("レディース水着セパレート", "282"); 
mymap.set("レディース水着ワンピース", "283"); 
mymap.set("レディース水着スポーツ用", "284"); 

mymap.set("レディーススーツ/フォーマル/ドレス", "27");
mymap.set("スカートスーツ上下", "1158"); 
mymap.set("パンツスーツ上下", "286"); 
mymap.set("ドレス", "287"); 
mymap.set("レディースパーティーバッグ", "288"); 
mymap.set("レディースシューズ", "289"); 
mymap.set("レディースウェディング", "1090"); 

mymap.set("マタニティ", "28");
mymap.set("マタニティトップス", "291"); 
mymap.set("マタニティアウター", "292"); 
mymap.set("マタニティインナー", "293"); 
mymap.set("マタニティワンピース", "294"); 
mymap.set("マタニティパンツ/スパッツ", "295"); 
mymap.set("マタニティスカート", "296"); 
mymap.set("マタニティパジャマ", "297"); 
mymap.set("マタニティ授乳服", "298"); 


mymap.set("メンズ", "2");
mymap.set("メンズトップス", "30");
mymap.set("メンズTシャツ/カットソー(半袖/袖なし)", "302"); 
mymap.set("メンズTシャツ/カットソー(七分/長袖)", "303"); 
mymap.set("メンズシャツ", "304"); 
mymap.set("メンズポロシャツ", "305"); 
mymap.set("メンズタンクトップ", "306"); 
mymap.set("メンズニット/セーター", "307"); 
mymap.set("メンズパーカー", "308"); 
mymap.set("メンズカーディガン", "309"); 
mymap.set("メンズスウェット", "310"); 
mymap.set("メンズジャージ", "311"); 
mymap.set("メンズベスト", "312"); 

mymap.set("メンズジャケット/アウター", "31");
mymap.set("メンズテーラードジャケット", "314"); 
mymap.set("メンズノーカラージャケット", "315"); 
mymap.set("メンズGジャン/デニムジャケット", "316"); 
mymap.set("メンズレザージャケット", "317"); 
mymap.set("メンズダウンジャケット", "318"); 
mymap.set("メンズライダースジャケット", "319"); 
mymap.set("メンズミリタリージャケット", "320"); 
mymap.set("メンズナイロンジャケット", "321"); 
mymap.set("メンズフライトジャケット", "322"); 
mymap.set("メンズダッフルコート", "323"); 
mymap.set("メンズピーコート", "324"); 
mymap.set("メンズステンカラーコート", "325"); 
mymap.set("メンズトレンチコート", "326"); 
mymap.set("メンズモッズコート", "327"); 
mymap.set("メンズチェスターコート", "1140"); 
mymap.set("メンズスタジャン", "328"); 
mymap.set("メンズスカジャン", "329"); 
mymap.set("メンズブルゾン", "330"); 
mymap.set("メンズマウンテンパーカー", "332"); 
mymap.set("メンズダウンベスト", "334"); 
mymap.set("メンズポンチョ", "331"); 
mymap.set("メンズカバーオール", "333"); 

mymap.set("メンズパンツ", "32");
mymap.set("メンズデニム/ジーンズ", "336"); 
mymap.set("メンズワークパンツ/カーゴパンツメンズ", "337"); 
mymap.set("メンズスラックス", "338"); 
mymap.set("メンズチノパン", "339"); 
mymap.set("メンズショートパンツ", "340"); 
mymap.set("メンズペインターパンツ", "341"); 
mymap.set("メンズサルエルパンツ", "342"); 
mymap.set("メンズオーバーオール", "343"); 

mymap.set("メンズ靴", "33");
mymap.set("メンズスニーカー", "345"); 
mymap.set("メンズサンダル", "346"); 
mymap.set("メンズブーツ", "347"); 
mymap.set("メンズモカシン", "348"); 
mymap.set("メンズドレス/ビジネス", "349"); 
mymap.set("メンズ長靴/レインシューズ", "350"); 
mymap.set("メンズデッキシューズ", "971"); 

mymap.set("メンズバッグ", "34");
mymap.set("メンズショルダーバッグ", "352"); 
mymap.set("メンズトートバッグ", "353"); 
mymap.set("メンズボストンバッグ", "354"); 
mymap.set("メンズリュック/バックパック", "355"); 
mymap.set("メンズウエストポーチ", "356"); 
mymap.set("メンズボディーバッグ", "357"); 
mymap.set("メンズドラムバッグ", "358"); 
mymap.set("メンズビジネスバッグ", "359"); 
mymap.set("メンズトラベルバッグ", "360"); 
mymap.set("メンズメッセンジャーバッグ", "361"); 
mymap.set("メンズエコバッグ", "362"); 

mymap.set("メンズスーツ", "35");
mymap.set("メンズスーツジャケット", "364"); 
mymap.set("メンズスーツベスト", "365"); 
mymap.set("メンズスラックス", "366"); 
mymap.set("メンズセットアップ", "367"); 

mymap.set("メンズ帽子", "36");
mymap.set("メンズキャップ", "369"); 
mymap.set("メンズハット", "370"); 
mymap.set("メンズニットキャップ/ビーニー", "371"); 
mymap.set("メンズハンチング/ベレー帽", "372"); 
mymap.set("メンズキャスケット", "373"); 
mymap.set("メンズサンバイザー", "374"); 

mymap.set("メンズアクセサリー", "37");
mymap.set("メンズネックレス", "376"); 
mymap.set("メンズブレスレット", "377"); 
mymap.set("メンズバングル/リストバンド", "378"); 
mymap.set("メンズリング", "379");
mymap.set("メンズピアス(片耳用)", "380"); 
mymap.set("メンズピアス(両耳用)", "381"); 
mymap.set("メンズアンクレット", "382");

mymap.set("メンズ小物", "38");
mymap.set("メンズ長財布", "384"); 
mymap.set("メンズ折り財布", "385"); 
mymap.set("メンズマネークリップ", "386"); 
mymap.set("メンズコインケース/小銭入れ", "387"); 
mymap.set("メンズ名刺入れ/定期入れ", "388"); 
mymap.set("メンズキーケース", "389"); 
mymap.set("メンズキーホルダー", "390"); 
mymap.set("メンズネクタイ", "391"); 
mymap.set("メンズ手袋", "392"); 
mymap.set("メンズハンカチ", "393"); 
mymap.set("メンズベルト", "394"); 
mymap.set("メンズマフラー", "395"); 
mymap.set("メンズストール", "396"); 
mymap.set("メンズバンダナ", "397"); 
mymap.set("メンズネックウォーマー", "398"); 
mymap.set("メンズサスペンダー", "399"); 
mymap.set("メンズウォレットチェーン", "400"); 
mymap.set("メンズサングラス/メガネ", "401"); 
mymap.set("メンズモバイルケース/カバー", "403"); 
mymap.set("メンズ手帳", "404");
mymap.set("メンズストラップ", "405"); 
mymap.set("メンズネクタイピン", "406"); 
mymap.set("メンズカフリンクス", "407"); 
mymap.set("メンズイヤマフラー", "408"); 
mymap.set("メンズ傘", "409"); 
mymap.set("メンズレインコート", "410"); 
mymap.set("メンズミラー", "411"); 
mymap.set("メンズタバコグッズ", "412"); 

mymap.set("メンズ時計", "39");
mymap.set("メンズ腕時計(アナログ)", "414"); 
mymap.set("メンズ腕時計(デジタル)", "415"); 
mymap.set("メンズラバーベルト", "416"); 
mymap.set("メンズレザーベルト", "417"); 
mymap.set("メンズ金属ベルト", "418"); 

mymap.set("メンズ水着", "40");
mymap.set("メンズ一般水着", "420"); 
mymap.set("メンズスポーツ用", "421"); 
mymap.set("メンズアクセサリー", "422"); 

mymap.set("メンズレッグウェア", "41");
mymap.set("メンズソックス", "424"); 
mymap.set("メンズレギンス/スパッツ", "425");
mymap.set("メンズレッグウォーマー", "426"); 

mymap.set("メンズアンダーウェア", "42");
mymap.set("メンズトランクス", "428"); 
mymap.set("メンズボクサーパンツ", "429");

mymap.set("ベビー・キッズ", "3");
mymap.set("ベビー服(女の子用) ~95cm", "44");
mymap.set("ベビー服(男の子用) ~95cm", "1107");
mymap.set("ベビー服(男女兼用) ~95cm", "1307");
mymap.set("キッズ服(女の子用) 100cm~", "45");
mymap.set("キッズ服(男の子用) 100cm~", "46");
mymap.set("キッズ服(男女兼用) 100cm~", "47");
mymap.set("キッズ靴", "48");
mymap.set("子ども用ファッション小物", "49");
mymap.set("おむつ/トイレ/バス", "50");
mymap.set("外出/移動用品", "51");
mymap.set("授乳/食事", "52");
mymap.set("ベビー家具/寝具/室内用品", "53");
mymap.set("おもちゃ", "54");
mymap.set("行事/記念品", "55");

mymap.set("インテリア・住まい・小物", "4");
mymap.set("キッチン/食器", "57");
mymap.set("ベッド/マットレス", "58");
mymap.set("ソファ/ソファベッド", "59");
mymap.set("椅子/チェア", "60");
mymap.set("机/テーブル", "61");
mymap.set("収納家具", "62");
mymap.set("ラグ/カーペット/マット", "63");
mymap.set("カーテン/ブラインド", "64");
mymap.set("ライト/照明", "65");
mymap.set("寝具", "66");
mymap.set("インテリア小物", "67");
mymap.set("季節/年中行事", "68");

mymap.set("本・音楽・ゲーム", "5");
mymap.set("本", "72");
mymap.set("漫画", "71");
mymap.set("雑誌", "73");
mymap.set("CD", "75");
mymap.set("DVD/ブルーレイ", "74");
mymap.set("レコード", "1160");

mymap.set("おもちゃ・ホビー・グッズ", "1328");
mymap.set("おもちゃ", "83");
mymap.set("タレントグッズ", "77");
mymap.set("コミック/アニメグッズ", "972");
mymap.set("トレーディングカード", "82");
mymap.set("フィギュア", "81");
mymap.set("楽器/器材", "79");
mymap.set("コレクション", "114");
mymap.set("ミリタリー", "80");
mymap.set("美術品", "84");
mymap.set("アート用品", "85");


mymap.set("コスメ・香水・美容", "6");
mymap.set("ベースメイク", "88");
mymap.set("メイクアップ", "1387");
mymap.set("ネイルケア", "89");
mymap.set("香水", "87");
mymap.set("スキンケア/基礎化粧品", "1263");
mymap.set("ヘアケア", "90");
mymap.set("ボディケア", "91");
mymap.set("オーラルケア", "92");
mymap.set("リラクゼーション", "93");
mymap.set("ダイエット", "94");


mymap.set("家電・スマホ・カメラ", "7");
mymap.set("スマートフォン/携帯電話", "100");
mymap.set("スマホアクセサリー", "862");
mymap.set("PC/タブレット", "96");
mymap.set("カメラ", "97");
mymap.set("テレビ/映像機器", "98");
mymap.set("オーディオ機器", "99");
mymap.set("美容/健康", "1237");
mymap.set("冷暖房/空調", "1243");
mymap.set("生活家電", "101");

mymap.set("スポーツ・レジャー", "8");
mymap.set("ゴルフ", "1183");
mymap.set("フィッシング", "1172");
mymap.set("自転車", "1139");
mymap.set("トレーニング/エクササイズ", "1153");
mymap.set("野球", "884");
mymap.set("サッカー/フットサル", "885");
mymap.set("テニス", "892");
mymap.set("スノーボード", "104")
;mymap.set("スキー", "1216");
mymap.set("アウトドア", "1164");

mymap.set("ハンドメイド", "9");
mymap.set("アクセサリー(女性用)", "914");
mymap.set("ファッション/小物", "106");
mymap.set("アクセサリー/時計", "107");
mymap.set("日用品/インテリア", "108");
mymap.set("趣味/おもちゃ", "109");
mymap.set("キッズ/ベビー", "110");
mymap.set("素材/材料", "1097");


mymap.set("チケット", "1027");
mymap.set("音楽", "1028");
mymap.set("スポーツ", "1037");
mymap.set("演劇/芸能", "1049");
mymap.set("イベント", "1059");
mymap.set("映画", "1064");
mymap.set("施設利用券", "1079");


mymap.set("自動車・オートバイ", "1318");
mymap.set("自動車本体", "1329");
mymap.set("自動車タイヤ/ホイール", "1330");
mymap.set("自動車パーツ", "946");
mymap.set("自動車アクセサリー", "115");
mymap.set("オートバイ車体", "951");
mymap.set("オートバイパーツ", "116");
mymap.set("オートバイアクセサリー", "949");
mymap.set("すべて", "0");

const statusMap = new Map();
statusMap.set("新品、未使用", '1');
statusMap.set("未使用に近い", '2');
statusMap.set("目立った傷や汚れなし", '3');
statusMap.set("やや傷や汚れあり", '4');
statusMap.set("傷や汚れあり", '5');
statusMap.set("全体的に状態が悪い", '6');

const yahmap = new Map();

    yahmap.set("ファッション", '23000');
    yahmap.set("ブランド別", '23172');
    yahmap.set("ファッション小物", '23004');
    yahmap.set("レディースバッグ", '2084005069');
    yahmap.set("メンズファッション", '23176');
    yahmap.set("レディースシューズ", '23312');
    yahmap.set("メンズシューズ", '23200');
    yahmap.set("レディースファッション", '23288');
    yahmap.set("メンズバッグ", '2084006467');
    yahmap.set("キッズ、ベビーファッション", '2084293011');
    yahmap.set("男女兼用バッグ", '2084233229');
    yahmap.set("女性和服、着物", '2084005204');

    yahmap.set("アクセサリー、時計", '23104');
    yahmap.set("ブランドアクセサリー", '2084052553');
    yahmap.set("ブランド腕時計", '23260');
    yahmap.set("メンズアクセサリー", '2084005358');
    yahmap.set("レディースアクセサリー", '2084005359');
    yahmap.set("レディース腕時計", '23268');
    yahmap.set("メンズ腕時計", '23264');
    yahmap.set("時計用ベルト、バンド", '2084024555');
    yahmap.set("ユニセックス腕時計", '23272');
    yahmap.set("時計用工具", '2084024556');
    yahmap.set("懐中時計", '23276');
    yahmap.set("子ども用アクセサリー", '2084006476');


    yahmap.set("自動車、オートバイ", '26318');
    yahmap.set("中古車・新車", '26360');
    yahmap.set("オートバイ", '26308');
    yahmap.set("パーツ", '26322');
    yahmap.set("アクセサリー", '26320');


    yahmap.set("ビューティー、ヘルスケア", '42177');
    yahmap.set("香水、フレグランス", '42179');
    yahmap.set("めがね、コンタクト", '2084012478');
    yahmap.set("健康用品、健康器具", '2084042544');
    yahmap.set("ボディケア", '2084007425');
    yahmap.set("ネイルケア", '2084005298');
    yahmap.set("リラクゼーショングッズ", '2084042539');
    yahmap.set("ヘアケア", '2084005297');
    yahmap.set("救急、衛生用品", '24854');


    yahmap.set("アンティーク、コレクション", '20000');
    yahmap.set("雑貨", '21152');
    yahmap.set("印刷物", '20116');
    yahmap.set("乗り物", '21060');
    yahmap.set("工芸品", '2084024008');
    yahmap.set("広告、ノベルティグッズ", '27771');
    yahmap.set("SF", '42223');
    yahmap.set("トレーディングカード", '20992');
    yahmap.set("ディズニー", '27858');
    yahmap.set("電化製品", '20004');


    yahmap.set("事務、店舗用品", '22896');
    yahmap.set("ラッピング、包装", '2084047365');
    yahmap.set("文房具", '042484');
    yahmap.set("机上アクセサリー", '22920');
    yahmap.set("バッグ、スーツケース", '22904');


    yahmap.set("本、雑誌", '21600');
    yahmap.set("雑誌", '21884');
    yahmap.set("住まい、暮らし、育児", '2084008935');
    yahmap.set("趣味、スポーツ、実用", '2084008861');
    yahmap.set("ノンフィクション、教養", '2084008550');
    yahmap.set("アート、エンターテインメント", '2084009036');
    yahmap.set("人文、社会", '2084008565');
    yahmap.set("文学、小説", '2084008525');
    yahmap.set("ビジネス、経済", '2084008755');
    yahmap.set("漫画、コミック", '21636');
    yahmap.set("児童書、絵本", '21624');
    yahmap.set("古書、古文書", '2084263670');
    yahmap.set("自然科学と技術", '21820');


    yahmap.set("家電、AV、カメラ", '23632');
    yahmap.set("携帯電話、スマートフォン", '23960');
    yahmap.set("スマートウォッチ、ウェアラブル端末", '2084316074');
    yahmap.set("キッチン、食卓", '2084008364');
    yahmap.set("オーディオ機器", '23764');


    yahmap.set("音楽", '22152');
    yahmap.set("CD", '22192');
    yahmap.set("レコード", '22260');
    yahmap.set("記念品、思い出の品", '22396');
    yahmap.set("カセットテープ", '22344');
    yahmap.set("DVD", '2084046929');


    yahmap.set("住まい、インテリア", '24198');
    yahmap.set("家具、インテリア", '24230');
    yahmap.set("キッチン、食器", '42168');
    yahmap.set("家庭用品", '42160');
    yahmap.set("ペット用品", '24534');
    yahmap.set("ハンドメイド作品", '2084240626');
    yahmap.set("収納", '2084288099');
    yahmap.set("季節、年中行事", '20284');
    yahmap.set("防災、セキュリティ", '2084047969');
    yahmap.set("工具、DIY用品", '24642');


    yahmap.set("スポーツ、レジャー", '24698');
    yahmap.set("スポーツウエア", '23008');
    yahmap.set("スポーツ別", '25152');
    yahmap.set("キャンプ、アウトドア用品", '24702');
    yahmap.set("アウトドアウエア", '24802');
    yahmap.set("自転車、サイクリング", '26222');
    yahmap.set("スポーツサングラス", '2084214045');


    yahmap.set("ホビー、カルチャー", '24242');
    yahmap.set("美術品", '20056');
    yahmap.set("ハンドクラフト、手工芸", '20924');
    yahmap.set("アート用品", '20124');
    yahmap.set("航空機", '26186');
    yahmap.set("ミリタリー", '20428');
    yahmap.set("楽器、器材", '22436');

    
    yahmap.set("おもちゃ、ゲーム", '25464');
    yahmap.set("ミニカー", '2084260113');
    yahmap.set("ゲーム", '27727');
    yahmap.set("ぬいぐるみ", '40494');
    yahmap.set("フィギュア", '25888');
    yahmap.set("人形、キャラクタードール", '25864');
    yahmap.set("プラモデル", '2084250263');
    yahmap.set("パズル", '26018');
    yahmap.set("食玩、おまけ", '2084312318');
    yahmap.set("キャラクター玩具", '26077');


    yahmap.set("コミック、アニメグッズ", '20060');
    yahmap.set("作品別", '2084000109');


    yahmap.set("映画、ビデオ", '21964');
    yahmap.set("DVD", '21968');
    yahmap.set("映画関連グッズ", '22124');
    yahmap.set("ブルーレイ", '2084239338');
    yahmap.set("ビデオテープ", '22072');
    
    yahmap.set("その他", '26084');
    yahmap.set("修理、取り付け", '2084214140');
    yahmap.set("レンタル", '2084307720');


    yahmap.set("コンピュータ", '23336');
    yahmap.set("タブレット", '2084292086');
    yahmap.set("サプライ", '2084039461');
    yahmap.set("周辺機器", '2084039561');
    yahmap.set("パソコン", '2084039759');


    yahmap.set("ベビー用品", '24202');
    yahmap.set("外出、移動用品", '2084042548');


    yahmap.set("タレントグッズ", '2084032594');


    yahmap.set("食品、飲料", '23976');
    yahmap.set("菓子、デザート", '23982');
    yahmap.set("すべて", '0');

    const yahStatusmap = new Map();

    yahStatusmap.set("未使用", '1');
    yahStatusmap.set("未使用に近い", '3');
    yahStatusmap.set("目立った傷や汚れなし", '4');
    yahStatusmap.set("やや傷や汚れあり", '5');
    yahStatusmap.set("傷や汚れあり", '6');
    yahStatusmap.set("全体的に状態が悪い", '7');

  const classes = useStyles();
  const [data, setData]= useState({
    columns: [
      {
        label: <p style={{textAlign: "center"}}>番号</p>,
        field: 'number',
        sort: 'asc'
      },
      {
        label: <div style={{textAlign: "center"}}>通知タイトル</div>,
        field: 'search_title',
        sort: 'asc'
      },
      {
        label: <p style={{textAlign: "center"}}>商品名</p>,
        field: 'product_name',
        sort: 'asc'
      },
      {
        label: <p style={{textAlign: "center"}}>価格(円)</p>,
        field: 'price',
        sort: 'asc'
      },
      {
        label: <p style={{textAlign: "center"}}>URL</p>,
        field: 'url',
        sort: 'asc'
      },
      {
        label: <p style={{textAlign: "center"}}>商品ID</p>,
        field: 'product_ID',
        sort: 'asc'
      },
      {
        label: <p style={{textAlign: "center"}}>商品画像</p>,
        field: 'product_image',
        sort: 'asc'
      }
    ],
    rows: []
  });

  const [yahdata, setYahdata]= useState({
    columns: [
      {
        label: <p style={{textAlign: "center"}}>番号</p>,
        field: 'number',
        sort: 'asc'
      },
      {
        label: <div style={{textAlign: "center"}}>通知タイトル</div>,
        field: 'search_title',
        sort: 'asc'
      },
      {
        label: <p style={{textAlign: "center"}}>商品名</p>,
        field: 'product_name',
        sort: 'asc'
      },
      {
        label: <p style={{textAlign: "center"}}>価格(円)</p>,
        field: 'price',
        sort: 'asc'
      },
      {
        label: <p style={{textAlign: "center"}}>URL</p>,
        field: 'url',
        sort: 'asc'
      },
      {
        label: <p style={{textAlign: "center"}}>商品ID</p>,
        field: 'product_ID',
        sort: 'asc'
      },
      {
        label: <p style={{textAlign: "center"}}>商品画像</p>,
        field: 'product_image',
        sort: 'asc'
      }
    ],
    rows: []
  });

  const [merflag, setMerflag] = useState(0);
  const [yahflag, setYahflag] = useState(0);

  const [values, setValues] = useState({
    shop: 10,
    lineToken: '',
  });
  const [merProgress, setMerProgress] = useState(0);
  const [yahProgress, setYahProgress] = useState(0);

  useEffect(() => {
    let tmp = {shop: 10, lineToken: ''};
    if(localStorage.getItem('lineToken')) tmp.lineToken = localStorage.getItem('lineToken');
    if(localStorage.getItem('shop')) tmp.shop = Number(localStorage.getItem('shop'));
    setValues(tmp);
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    localStorage.setItem([event.target.name], event.target.value);
  };

  const searchStart = async() => {
    if(values.shop === 10) {
      if(localStorage.getItem('merData'));
      else {
        alert("検索条件を入力してください。"); return ;
      }
      const postData = JSON.parse(localStorage.getItem('merData'));
      if(postData.length === 0) {
        alert("検索条件を入力してください。"); return ;
      }

      setMerProgress(1);
      setMerflag(1);

      console.log(postData);  
      let save = [];
        for(let i = 0 ; i < postData.length; i++) {
            save[i] = {Title: '', category: '', keyword: '', expkeyword: '', minprice: '', maxprice: '', status: ''};
            save[i].Title = postData[i].Title;
            save[i].category = mymap.get(postData[i].category);
            save[i].keyword = postData[i].keyword;
            save[i].expkeyword = postData[i].expkeyword;
            save[i].minprice = postData[i].minprice;
            save[i].maxprice = postData[i].maxprice;
            
            let tmp2 = statusMap.get(postData[i].status[0]);
            for(let j = 1 ; j < postData[i].status.length; j++) 
                tmp2 += "%2C" + statusMap.get(postData[i].status[j]);

            save[i].status = tmp2;
        }
        console.log(save);
      if(postData.length === 0) {
        alert("検索条件を入力してください。"); return ;
      }

      let flag = 0;

      while(1) {
        try {
        const response = await axios.post('/api/v1/user/mercari', {
          Data: save,
          token: values.lineToken,
          email: JSON.parse(localStorage.getItem('token')).email,
          flag: flag
        });

        if(response.data === "expired") {
          const logoutData = {
            email: JSON.parse(localStorage.getItem('token')).email,
          };
          localStorage.clear();
          axios
            .post('/api/v1/user/logout', logoutData)
            .then((res) => {
              alert("購入されていないか、使用期限が切れています。")
              window.location = '/login';
            })
            .catch((err) => {});
          return ;
        }

        if(response.data.product_names.length > 0) setMerProgress(2);
        else setMerProgress(1);

        console.log(response);
        flag++;
          let tmp = {
            columns: [
              {
                label: <div style={{display: "flex", justifyContent: "center", alignItems: "center",height: "20px"}}>番号</div>,
                field: 'number',
                sort: 'asc'
              },
              {
                label: <div style={{display: "flex", justifyContent: "center", alignItems: "center",height: "20px"}}>通知タイトル</div>,
                field: 'search_title',
                sort: 'asc'
              },
              {
                label: <div style={{display: "flex", justifyContent: "center", alignItems: "center",height: "20px"}}>商品名</div>,
                field: 'product_name',
                sort: 'asc'
              },
              {
                label: <div style={{display: "flex", justifyContent: "center", alignItems: "center",height: "20px"}}>価格(円)</div>,
                field: 'price',
                sort: 'asc'
              },
              {
                label: <div style={{display: "flex", justifyContent: "center", alignItems: "center",height: "20px"}}>URL</div>,
                field: 'url',
                sort: 'asc'
              },
              {
                label: <div style={{display: "flex", justifyContent: "center", alignItems: "center",height: "20px"}}>商品ID</div>,
                field: 'product_ID',
                sort: 'asc'
              },
              {
                label: <div style={{display: "flex", justifyContent: "center", alignItems: "center",height: "20px"}}>商品画像</div>,
                field: 'product_image',
                sort: 'asc'
              }
            ],
            rows:[]
          }
          // if(response.data.flag === 1) setLine_error("showline");
          let cnt = response.data.product_names.length;
          let arr = [];
          for(let i = 0 ; i < cnt;i++) {
            let row = {number: 0, search_title: "", product_name: "", price: 0, url: "", product_ID: "", product_image: ""};
            row.number = i + 1;
            row.search_title = <p style={{maxWidth: "200px",minWidth: "200px",overflowWrap: "anywhere"}}>{response.data.search_title[i]}</p>;
            row.product_name =<p style={{maxWidth: "400px", minWidth: "400px"}}>{response.data.product_names[i]}</p>;
            row.price = response.data.product_prices[i];
            row.url = <p style={{maxWidth: "150px", overflow: "hidden"}}><a href={response.data.product_urls[i]} target = "_blank" rel="noreferrer">{response.data.product_urls[i]}</a></p>;
            if(response.data.product_urls[i].split('/')[3] === 'shops') {
              row.product_ID = response.data.product_urls[i].split('/')[5];
            }
            else row.product_ID = response.data.product_urls[i].split('/')[4];
            row.product_image = <div style={{display: "flex", justifyContent: "center"}}><img style={{width: "100px", height: "100px"}} src = {response.data.image_urls[i]} alt = "image"/></div>;
            arr[i] = row;
          }
          tmp.rows = arr;

          setData(tmp);
        } catch (error) {
          alert("トークンの使用期間が経過したので、トークンを交換してください。");
          break;
        }
      }
    }

    if(values.shop === 20) {
      if(localStorage.getItem('yahData'));
      else {
        alert("検索条件を入力してください。"); return ;
      }
      const postData = JSON.parse(localStorage.getItem('yahData'));
      if(postData.length === 0) {
        alert("検索条件を入力してください。"); return ;
      }

      setYahProgress(1);
      setYahflag(1);

      console.log(postData); 
      let save = [];
      for(let i = 0 ; i < postData.length; i++) {
          save[i] = {Title: '', category: '', keyword: '', minprice: '', maxprice: '', status: ''};
          save[i].Title = postData[i].Title;
          save[i].category = yahmap.get(postData[i].category);
          save[i].keyword = postData[i].keyword;
          save[i].minprice = postData[i].minprice;
          save[i].maxprice = postData[i].maxprice;
          
          let tmp2 = yahStatusmap.get(postData[i].status[0]);
          for(let j = 1 ; j < postData[i].status.length; j++) 
              tmp2 += "%2C" + yahStatusmap.get(postData[i].status[j]);

          save[i].status = tmp2;
      }
      console.log(save);
    if(postData.length === 0) {
      alert("検索条件を入力してください。"); return ;
    }

    let flag = 0;
    console.log(save);

    while(1) {
      try {
      const response = await axios.post('/api/v1/user/yahoo', {
        Data: save,
        token: values.lineToken,
        email: JSON.parse(localStorage.getItem('token')).email,
        flag: flag
      });

      if(response.data === "expired") {
        const logoutData = {
          email: JSON.parse(localStorage.getItem('token')).email,
        };
        localStorage.clear();
        axios
          .post('/api/v1/user/logout', logoutData)
          .then((res) => {
            alert("購入されていないか、使用期限が切れています。")
            window.location = '/login';
          })
          .catch((err) => {});
        return ;
      }
      if(response.data.product_names.length) setYahProgress(2);
      else setYahProgress(1);

      console.log(response);
      flag++;
        let tmp = {
          columns: [
            {
              label: <div style={{display: "flex", justifyContent: "center", alignItems: "center",height: "20px"}}>番号</div>,
              field: 'number',
              sort: 'asc'
            },
            {
              label: <div style={{display: "flex", justifyContent: "center", alignItems: "center",height: "20px"}}>通知タイトル</div>,
              field: 'search_title',
              sort: 'asc'
            },
            {
              label: <div style={{display: "flex", justifyContent: "center", alignItems: "center",height: "20px"}}>商品名</div>,
              field: 'product_name',
              sort: 'asc'
            },
            {
              label: <div style={{display: "flex", justifyContent: "center", alignItems: "center",height: "20px"}}>価格(円)</div>,
              field: 'price',
              sort: 'asc'
            },
            {
              label: <div style={{display: "flex", justifyContent: "center", alignItems: "center",height: "20px"}}>URL</div>,
              field: 'url',
              sort: 'asc'
            },
            {
              label: <div style={{display: "flex", justifyContent: "center", alignItems: "center",height: "20px"}}>商品ID</div>,
              field: 'product_ID',
              sort: 'asc'
            },
            {
              label: <div style={{display: "flex", justifyContent: "center", alignItems: "center",height: "20px"}}>商品画像</div>,
              field: 'product_image',
              sort: 'asc'
            }
          ],
          rows:[]
        }
        // if(response.data.flag === 1) setLine_error("showline");
        let cnt = response.data.product_names.length;
        let arr = [];
        for(let i = 0 ; i < cnt;i++) {
          let row = {number: 0,search_title: "", product_name: "", price: 0, url: "", product_ID: "", product_image: ""};
          row.number = i + 1;
          row.search_title = <p style={{maxWidth: "200px",minWidth: "200px",overflowWrap: "anywhere"}}>{response.data.search_title[i]}</p>;
          row.product_name =<p style={{maxWidth: "400px", minWidth: "400px"}}>{response.data.product_names[i]}</p>;
          row.price = response.data.product_prices[i];
          row.url = <p style={{maxWidth: "150px", overflow: "hidden"}}><a href={response.data.product_urls[i]} target = "_blank" rel="noreferrer" style={{width: "100px"}}>{response.data.product_urls[i]}</a></p>;
          row.product_ID = response.data.product_urls[i].split('/')[response.data.product_urls[i].split('/').length - 1];
          row.product_image = <div style={{display: "flex", justifyContent: "center"}}><img style={{width: "100px", height: "100px"}} src = {response.data.image_urls[i]} alt = "image"/></div>;
          arr[i] = row;
        }
        tmp.rows = arr;

        setYahdata(tmp);
      } catch (error) {
        alert("トークンの使用期間が経過したので、トークンを交換してください。");
        break;
      }
    }
    }
  }

  return (
    <>
      <div className='toolHeader'>
        <FormControl variant="standard" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">ストア</InputLabel>
          <Select
            name='shop'
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={values.shop}
            onChange={handleChange}
            label="ストア"
          >
            <MenuItem value={10}>メルカリ</MenuItem>
            <MenuItem value={20}>ヤフオク</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" className={classes.formControl}>
          <TextField 
            name='lineToken'
            id="outlined-basic" 
            label="Line notifyトークン入力" 
            variant="standard" 
            onChange={handleChange} 
            value={values.lineToken}/>
        </FormControl>

        <FormControl variant="standard" className={classes.formControl}>

        <button style={{width: "450px", height: "50px",
        borderRadius: "5px", border: "none"}}><a href='https://notify-bot.line.me/my/'
        style={{textDecoration: 'none'}} target='_blank'>
          Lineトークンを発行するにはこちらをタップしてください。</a></button>
        </FormControl>

        <FormControl variant="standard" className={classes.formControlStop}>
          <Button variant="contained" className={classes.button}  color="primary"
          onClick={searchStart} style={((merflag === 1 && values.shop === 10) ||
             (yahflag === 1 && values.shop === 20))? {visibility: "hidden"}: {}}>開始</Button>
        </FormControl>

        <FormControl variant="standard" className={classes.formControl}>
          <Button variant="contained" className={classes.button}  color="primary"
          onClick={() => window.location.reload(false)} >停止</Button>
        </FormControl>

      </div>

      <hr></hr>

      {values.shop === 10 ? 
        merProgress === 0 ? <Merc />: 
        merProgress === 1 ? <Box sx={{ width: '100%' }}><LinearProgress /></Box>:
              <MDBDataTable
                striped
                bordered
                small  
                searchLabel="検索"
                infoLabel={["見る", "から", "まで", "全体"]}
                entriesLabel="表示数"
                paginationLabel= {['以前', '次に']}
                data={data}
            />
        : ""}
      {values.shop === 20 ? 
        yahProgress === 0 ? <Yahoo />: 
        yahProgress === 1 ? <Box sx={{ width: '100%' }}><LinearProgress /></Box>:
              <MDBDataTable
                striped
                bordered
                small  
                searchLabel="検索"
                infoLabel={["見る", "から", "まで", "全体"]}
                entriesLabel="表示数"
                paginationLabel= {['以前', '次に']}
                data={yahdata}
            />
        : ""}
    </>
  );
};

export default PieChart;
