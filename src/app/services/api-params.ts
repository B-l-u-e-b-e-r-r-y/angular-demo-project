export interface ApiParams {
    $select?: string;          // 僅回傳特定查詢欄位
    $filter?: string;          // 依指定條件進行資料篩選
    $orderby?: string;         // 依指定欄位進行資料排序
    $top?: number;             // 回傳前 N 筆結果 Default value : 30
    $skip?: number;            // 略過前 N 筆結果
    $count?: boolean;          // 僅回傳查詢資料筆數
    $format?: 'json' | 'xml';  // API 輸出格式 Default value : json
    $token?: string;
    startDate?: string;
    endDate?: string;
    startMonth?: string;
    endMonth?: string;
}
