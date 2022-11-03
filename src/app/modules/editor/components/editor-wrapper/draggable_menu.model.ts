
export interface menu {
    id: string,
    name: string,
    display_name: string,
    parent_id: string,
    icon: string,
    submenu:submenu[]
}

export interface submenu {
    id: string;
    name: string,
    display_name: string,
    parent_id: string,
    icon: string,
    is_checked:boolean
}

export const menuList: menu[] = [
    {
        "id": "60",
        "name": "home",
        "display_name": "Home",
        "icon": "feather:home",
        "parent_id": "60",
        "submenu": [
            {
                "id": "115",
                "name": "Undo",
                "display_name": "Undo",
                "parent_id": "60",
                "icon": "undo",
                "is_checked": false,
                
            },
            {
                "id": "116",
                "name": "Redo",
                "display_name": "Redo",
                "parent_id": "60",
                "icon": "redo",
                "is_checked": false
            },
            {
                "id": "117",
                "name": "Find",
                "display_name": "Find",
                "parent_id": "60",
                "icon": "search",
                "is_checked": false
            },
            {
                "id": "118",
                "name": "Replace",
                "display_name": "Replace",
                "parent_id": "60",
                "icon": "autorenew",
                "is_checked": false
            },
            {
                "id": "119",
                "name": "Bold",
                "display_name": "Bold",
                "parent_id": "60",
                "icon": "format_bold",
                "is_checked": false
            },
            {
                "id": "120",
                "name": "Italic",
                "display_name": "Italic",
                "parent_id": "60",
                "icon": "format_italic",
                "is_checked": false
            },
            {
                "id": "121",
                "name": "Underline",
                "display_name": "Underline",
                "parent_id": "60",
                "icon": "feather:underline",
                "is_checked": false
            },
            {
                "id": "122",
                "name": "Strike",
                "display_name": "Strike",
                "parent_id": "60",
                "icon": "strikethrough_s",
                "is_checked": false
            },
            {
                "id": "123",
                "name": "Superscript",
                "display_name": "Superscript",
                "parent_id": "60",
                "icon": "superscript",
                "is_checked": false
            },
            {
                "id": "124",
                "name": "Subscript",
                "display_name": "Subscript",
                "parent_id": "60",
                "icon": "subscript",
                "is_checked": false
             
            },
            {
                "id":"125",
                "name":"Cut",
                "display_name":"cut",
                "parent_id":"60",
                "icon":"content_cut",
                "is_checked": false

            },
            {
                "id": "126",
                "name": "Copy",
                "display_name": "Copy",
                "parent_id": "60",
                "icon": "content_copy",
                "is_checked": false
            },
            {
                "id": "127",
                "name": "Lowercase",
                "display_name": "Lowercase",
                "parent_id": "60",
                "icon": "heroicons_outline:tools",
                "is_checked": false
            },
            {
                "id": "128",
                "name": "InitialUppercase",
                "display_name": "InitialUppercase",
                "parent_id": "60",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "129",
                "name": "AllUppercase",
                "display_name": "AllUppercase",
                "parent_id": "60",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "241",
                "name": "Spaces",
                "display_name": "Spaces",
                "parent_id": "60",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "241",
                "name": "text_color",
                "display_name": "Text Color",
                "parent_id": "60",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "241",
                "name": "text_highlight_color",
                "display_name": "Text Highlight Color",
                "parent_id": "60",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "241",
                "name": "bullet_list",
                "display_name": "Bullet List",
                "parent_id": "60",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "241",
                "name": "number_list",
                "display_name": "Number List",
                "parent_id": "60",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "241",
                "name": "indent",
                "display_name": "Indent",
                "parent_id": "60",
                "icon": "",
                "is_checked": false
            }
        ]
    },
    {
        "id": "61",
        "name": "insert",
        "display_name": "Insert",
        "parent_id": "0",
        "icon": "heroicons_outline:plus-circle",
        "submenu": [
            {
                "id": "130",
                "name": "image",
                "display_name": "Image",
                "parent_id": "61",
                "icon": "add_to_photos",
                "is_checked": false
            },
            {
                "id": "131",
                "name": "multiimage",
                "display_name": "MultiImage",
                "parent_id": "61",
                "icon": "insert_photo",
                "is_checked": false
            },
            {
                "id": "132",
                "name": "table",
                "display_name": "Table",
                "parent_id": "61",
                "icon": "table_chart",
                "is_checked": false
            },
            {
                "id": "133",
                "name": "math",
                "display_name": "Math",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "134",
                "name": "comments",
                "display_name": "Comments",
                "parent_id": "61",
                "icon": "comment",
                "is_checked": false
            },
            {
                "id": "135",
                "name": "authorquery",
                "display_name": "Author Query",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "136",
                "name": "specialchar",
                "display_name": "Special Char",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "137",
                "name": "patchreference",
                "display_name": "Patch Reference",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "138",
                "name": "custom_reference",
                "display_name": "Reference",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "139",
                "name": "citationlink",
                "display_name": "Citation Link",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "140",
                "name": "chapter_footnote",
                "display_name": "Chapter Footnote",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "141",
                "name": "end_footnote",
                "display_name": "End Footnote",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "142",
                "name": "footnote_settings",
                "display_name": "Footnote Settings",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "143",
                "name": "custom_glossary",
                "display_name": "Glossary",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "146",
                "name": "editor_link",
                "display_name": "Editor Link",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "147",
                "name": "editor_insertpre",
                "display_name": "Editor Insert Pre",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "148",
                "name": "editor_assessment",
                "display_name": "Editor Assessment",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "149",
                "name": "answer_line",
                "display_name": "Answer Line",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "150",
                "name": "toc_xml_value",
                "display_name": "TOC Xml Value",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "151",
                "name": "bookend_glossary",
                "display_name": "Bookend Glossary",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "152",
                "name": "mini_toc_generate",
                "display_name": "Mini TOC Generate",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "153",
                "name": "designer_notes",
                "display_name": "Designer Notes",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "154",
                "name": "editor_asset",
                "display_name": "Editor Asset",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "197",
                "name": "List Color",
                "display_name": "List Color",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "251",
                "name": "Word Upload",
                "display_name": "Word Upload",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "254",
                "name": "Update KT PageNum",
                "display_name": "Update KT PageNum",
                "parent_id": "61",
                "icon": "",
                "is_checked": false
            }
        ]
    },
    {
        "id": "62",
        "name": "tools",
        "display_name": "Tools",
        "parent_id": "0",
        "icon": "feather:settings",
        "submenu": [
            {
                "id": "156",
                "name": "Update PDF",
                "display_name": "Update PDF",
                "parent_id": "62",
                "icon": "picture_as_pdf",
                "is_checked": false
            },
            {
                "id": "157",
                "name": "Update XML",
                "display_name": "Update XML",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "158",
                "name": "Update Epub",
                "display_name": "Update Epub",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "159",
                "name": "Extract Word",
                "display_name": "Extract Word",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "160",
                "name": "Citation ReOrder",
                "display_name": "Citation ReOrder",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "161",
                "name": "Export Links",
                "display_name": "Export Links",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "162",
                "name": "Page Break",
                "display_name": "Page Break",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "163",
                "name": "Export Asset Report",
                "display_name": "Export Asset Report",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "164",
                "name": "Chapter Indesign File Up",
                "display_name": "Chapter Indesign File Up",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "165",
                "name": "Edit Mapping Resource",
                "display_name": "Edit Mapping Resource",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "166",
                "name": "Change Style",
                "display_name": "Change Style",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "167",
                "name": "Common Art",
                "display_name": "Common Art",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "168",
                "name": "Math Process",
                "display_name": "Math Process",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "169",
                "name": "Math Export",
                "display_name": "Math Export",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "170",
                "name": "Image Position",
                "display_name": "Image Position",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "171",
                "name": "Upload CRX PDF",
                "display_name": "Upload CRX PDF",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "172",
                "name": "Table Export",
                "display_name": "Table Export",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "173",
                "name": "EndNote Citation",
                "display_name": "EndNote Citation",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "178",
                "name": "Page Break",
                "display_name": "Page Break",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "242",
                "name": "Link Key Terms",
                "display_name": "Link Key Terms",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
                },
            {
                "id": "243",
                "name": "cartridge_xml",
                "display_name": "Cartridge Xml",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
                },
            {
                "id": "244",
                "name": "Index Existing",
                "display_name": "Index Existing",
                "parent_id": "62",
                "icon": "",
                "is_checked": false
                }
        ]
    },
    {
        "id": "63",
        "name": "reviews",
        "display_name": "Reviews",
        "parent_id": "0",
        "icon": "feather:settings",
        "submenu": [
            {
                "id": "174",
                "name": "Accept",
                "display_name": "Accept",
                "parent_id": "63",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "175",
                "name": "Reject",
                "display_name": "Reject",
                "parent_id": "63",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "176",
                "name": "Accept All",
                "display_name": "Accept All",
                "parent_id": "63",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "177",
                "name": "Reject All",
                "display_name": "Reject All",
                "parent_id": "63",
                "icon": "",
                "is_checked": false
            }
        ]
    },
    {
        "id": "65",
        "name": "output",
        "display_name": "Output",
        "parent_id": "0",
        "icon": "open_in_browser",
        "submenu": [
            {
                "id": "179",
                "name": "Change View",
                "display_name": "Change View",
                "parent_id": "65",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "180",
                "name": "Download",
                "display_name": "Download",
                "parent_id": "65",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "181",
                "name": "CRX PDF",
                "display_name": "CRX PDF",
                "parent_id": "65",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "182",
                "name": "Revert",
                "display_name": "Revert",
                "parent_id": "65",
                "icon": "",
                "is_checked": false
            }
        ]
    },
    {
        "id": "66",
        "name": "formatting",
        "display_name": "Formatting",
        "parent_id": "0",
        "icon": "feather:align-center",
        "submenu": [
            {
                "id": "183",
                "name": "Paragraph",
                "display_name": "Paragraph",
                "parent_id": "66",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "184",
                "name": "Page",
                "display_name": "Page",
                "parent_id": "66",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "185",
                "name": "Inline",
                "display_name": "Inline",
                "parent_id": "66",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "186",
                "name": "Document",
                "display_name": "Document",
                "parent_id": "66",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "187",
                "name": "Math Cut",
                "display_name": "Math Cut",
                "parent_id": "66",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "188",
                "name": "Math Paste",
                "display_name": "Math Paste",
                "parent_id": "66",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "189",
                "name": "Math Delete",
                "display_name": "Math Delete",
                "parent_id": "66",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "190",
                "name": "Text Frame",
                "display_name": "Text Frame",
                "parent_id": "66",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "191",
                "name": "Inline Image",
                "display_name": "Inline Image",
                "parent_id": "66",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "192",
                "name": "Inline Math",
                "display_name": "Inline Math",
                "parent_id": "66",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "193",
                "name": "Term",
                "display_name": "Term",
                "parent_id": "66",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "194",
                "name": "Borders and Shading",
                "display_name": "Borders and Shading",
                "parent_id": "66",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "195",
                "name": "Paragraph Rules",
                "display_name": "Paragraph Rules",
                "parent_id": "66",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "196",
                "name": "List",
                "display_name": "List",
                "parent_id": "66",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "239",
                "name": "Columns",
                "display_name": "columns",
                "parent_id": "66",
                "icon": "",
                "is_checked": false
            }
        ]
    },
    {
        "id": "90",
        "name": "tablelayout",
        "display_name": "Table Layout",
        "parent_id": "0",
        "icon": "heroicons_outline:table",
        "submenu": [
            {
                "id": "198",
                "name": "Insert Column Before",
                "display_name": "Insert Column Before",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "199",
                "name": "Insert Column After",
                "display_name": "Insert Column After",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "200",
                "name": "Delete Column",
                "display_name": "Delete Column",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "201",
                "name": "Column Properties",
                "display_name": "Column Properties",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "202",
                "name": "Insert Row Before",
                "display_name": "Insert Row Before",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "203",
                "name": "Insert Row Afer",
                "display_name": "Insert Row Afer",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "204",
                "name": "Delete Row",
                "display_name": "Delete Row",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "205",
                "name": "Row Properties",
                "display_name": "Row Properties",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "206",
                "name": "Insert Cell Before",
                "display_name": "Insert Cell Before",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "207",
                "name": "Insert Cell After",
                "display_name": "Insert Cell After",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "208",
                "name": "Delete Cell",
                "display_name": "Delete Cell",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "209",
                "name": "Cell Merge",
                "display_name": "Cell Merge",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "210",
                "name": "Cell Merge Right",
                "display_name": "Cell Merge Right",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "211",
                "name": "Cell Merge Down",
                "display_name": "Cell Merge Down",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "212",
                "name": "Split Cell Vertically",
                "display_name": "Split Cell Vertically",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "213",
                "name": "Split Cell Horizontally",
                "display_name": "Split Cell Horizontally",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "214",
                "name": "Cell Properties",
                "display_name": "Cell Properties",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "215",
                "name": "Delete Table",
                "display_name": "Delete Table",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "216",
                "name": "Cut Table",
                "display_name": "Cut Table",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "217",
                "name": "Paste Table",
                "display_name": "Paste Table",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "218",
                "name": "Table Footnote",
                "display_name": "Table Footnote",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "219",
                "name": "Curly Braces",
                "display_name": "Curly Braces",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "220",
                "name": "Math Longest",
                "display_name": "Math Longest",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "221",
                "name": "Math Equal Align",
                "display_name": "Math Equal Align",
                "parent_id": "90",
                "icon": "",
                "is_checked": false
            }
        ]
    },
    {
        "id": "114",
        "name": "copy_editing",
        "display_name": "CE Tools",
        "parent_id": "0",
        "icon": "file_copy",
        "submenu": [
            {
                "id": "222",
                "name": "CE Settings",
                "display_name": "CE Settings",
                "parent_id": "114",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "223",
                "name": "CE Execute",
                "display_name": "CE Execute",
                "parent_id": "114",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "224",
                "name": "Consistency Checking",
                "display_name": "Consistency Checking",
                "parent_id": "114",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "225",
                "name": "Reference Reorder",
                "display_name": "Reference Reorder",
                "parent_id": "114",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "226",
                "name": "Glossary Reorder",
                "display_name": "Glossary Reorder",
                "parent_id": "114",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "227",
                "name": "nametonumberref",
                "display_name": "Name to Num Ref",
                "parent_id": "114",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "228",
                "name": "numbertonameref",
                "display_name": "Num to Name Ref",
                "parent_id": "114",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "240",
                "name": "Math Validation",
                "display_name": "Math Validation",
                "parent_id": "114",
                "icon": "",
                "is_checked": false
            },
            {
                "id": "245",
                "name": "Word Count",
                "display_name": "Word Count",
                "parent_id": "114",
                "icon": "",
                "is_checked": false
            }
        ]
    }
]