import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: "80%",
        marginTop: '20px',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        height: '55px',
        fontSize: '17px',
        marginTop: "30px",
    },
    margin: {
        marginTop: "20px",
    },
    secondmargin: {
      marginTop: "60px"
    },
    indeterminateColor: {
        color: "blue"
    },
    selectAllText: {
        fontWeight: 500
    },
    selectedAll: {
        backgroundColor: "rgba(0, 0, 0, 0.08)",
        "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.08)"
        }
    },
    conditionResult: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "90%",
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  variant: "menu"
};

const statusoptions = [
  "新品、未使用",
  "未使用に近い",
  "目立った傷や汚れなし",
  "やや傷や汚れあり",
  "傷や汚れあり",
  "全体的に状態が悪い"
];

const options = [
    "新品、未使用",
    "未使用に近い",
    "目立った傷や汚れなし",
    "やや傷や汚れあり",
    "傷や汚れあり",
    "全体的に状態が悪い"
  ];


  const Yahstatusoptions = [
    "未使用",
    "未使用に近い",
    "目立った傷や汚れなし",
    "やや傷や汚れあり",
    "傷や汚れあり",
    "全体的に状態が悪い"
  ];
  
  const Yahoptions = [
      "未使用",
      "未使用に近い",
      "目立った傷や汚れなし",
      "やや傷や汚れあり",
      "傷や汚れあり",
      "全体的に状態が悪い"
    ];

export { useStyles, MenuProps, statusoptions, options , Yahstatusoptions, Yahoptions};
