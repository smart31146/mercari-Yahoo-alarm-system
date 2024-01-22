import React, { useState,useEffect  } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { TextField } from '@material-ui/core';
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { MenuProps, useStyles, Yahoptions } from "./utils";
import {Button} from "@material-ui/core";

import TreeItem from "@mui/lab/TreeItem";
import { Popover, Typography } from "@mui/material";
import clsx from "clsx";
import { TreeView, useTreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const CustomContent = React.forwardRef(function CustomContent(props, ref) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (event) => {
    handleSelection(event);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled
      })}
      onMouseDown={handleMouseDown}
      ref={ref}
      style={{ padding: "3px 0" }}
    >
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component="div"
        className={classes.label}
      >
        {label}
      </Typography>
    </div>
  );
});
const CustomTreeItem = (props) => (
  <TreeItem ContentComponent={CustomContent} {...props} />
);

const Yahoo = () => {

    // select treeview
    const [newData, setNewData] = useState("");
    const label = "カテゴリー入力";
    const edit = 0;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [equipmentItem, setEquipmentItem] = useState("");
    const [equipmentId, setEquipmentId] = useState("");
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const renderTree = (nodes) => (
        <CustomTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children)
            ? nodes.children.map((node) => renderTree(node))
            : null}
        </CustomTreeItem>
    );
    //   

    const classes = useStyles();
    const [values, setValues] = useState({
      Title: '',
      keyword: '',
      minprice: 300,
      maxprice: 99999999
    });

    const [statusSelected, setstatusSelected] = useState([]);
    const statusisAllSelected = Yahoptions.length > 0 && statusSelected.length === Yahoptions.length;
    
    const statusHandleChange = (event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all") {
            setstatusSelected(statusSelected.length === Yahoptions.length ? [] : Yahoptions);
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

        fetch("data/fundingTypes.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
        }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            setNewData(myJson);
        });

        let postData = [];
        if(localStorage.getItem('yahData')) postData = JSON.parse(localStorage.getItem('yahData'));

        let save = [];
        for(let i = 0 ; i < postData.length; i++) {
            save[i] = {Title: '', category: '', keyword: '', minprice: '', maxprice: '', status: []};
            save[i].Title = postData[i].Title;
            save[i].category = postData[i].category;
            save[i].keyword = postData[i].keyword;
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
        if(equipmentItem === "") {alert("カテゴリを入力してください。"); return ;}
        if(statusSelected.length === 0 ) {alert("製品の状態を選択してください。"); return ;}

        let tmp = {};
        console.log(equipmentItem);
        tmp.Title = values.Title;
        tmp.category = equipmentItem;
        tmp.status = statusSelected;
        tmp.keyword = values.keyword;
        tmp.minprice = values.minprice;
        tmp.maxprice = values.maxprice;
        let tmpAry = list;
        tmpAry.unshift(tmp);
        console.log(tmp);

        tmp = {
            Title: '',
            keyword: '',
            minprice: 300,
            maxprice: 99999999
        }
        setValues(tmp);
        setstatusSelected([]);
        setEquipmentItem([]);
        setList(tmpAry);
        localStorage.setItem('yahData', JSON.stringify(tmpAry));
    }

    const conditionDelete = (index) => {
        console.log(index);
        let tmp = list;
        tmp.splice(index, 1);
        setstatusSelected([]);
        setList(tmp);
        localStorage.setItem('yahData', JSON.stringify(tmp));
    }

    const conditionEdit = (index) => {
      console.log(index);
      let tmp = list;
      let content = tmp[index];
      tmp.splice(index, 1);
      setList(tmp);
      localStorage.setItem('yahData', JSON.stringify(tmp));

      let tmp2 = {keyword: content.keyword, Title: content.Title,
      minprice: content.minprice, maxprice: content.maxprice};

      setValues(tmp2);
      setEquipmentItem(content.category);
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
            <TextField
                variant="standard"
                required={false}
                label={label}
                name="equipmentItem"
                id="equipmentItem"
                defaultValue={equipmentItem}
                value={equipmentItem}
                className="w-100"
                inputProps={{ readOnly: !edit }}
                onClick={handleClick}
            />

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
                }}
            >
                <TreeView
                aria-label="icon expansion"
                defaultSelected={equipmentId}
                selected={equipmentId}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                onNodeSelect={(e, id) => {
                    setEquipmentId(id);
                    setEquipmentItem(e.target.innerText);
                }}
                sx={{
                    height: 200,
                    flexGrow: 1,
                    minWidth: "200px",
                    overflowY: "auto"
                }}
                >
                {newData && newData.map((item, i) => renderTree(item))}
                </TreeView>
            </Popover>
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
                        statusSelected.length > 0 && statusSelected.length < Yahoptions.length
                    }
                    style={statusisAllSelected? {color:'blue'}: {}}
                    />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.selectAllText }}
                    primary="すべて"
                />
                </MenuItem>
                {Yahoptions.map((option) => (
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
            <table className='YahTable'>
              <thead>
                  <tr>
                      <th>番号</th>
                      <th>タイトル</th>
                      <th>キーワード</th>
                      <th>カテゴリー</th>
                      <th>商品状態</th>
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
  
  export default Yahoo;
  