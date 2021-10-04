CREATE OR REPLACE FUNCTION SearchAllTables(_search text) RETURNS TABLE( txt text ) as $funct$
    DECLARE __COUNT int;
    __SQL text;
BEGIN
    EXECUTE 'SELECT COUNT(0) FROM INFORMATION_SCHEMA.COLUMNS
                    WHERE    DATA_TYPE = ''text''
                    AND          table_schema = ''public'' ' INTO __COUNT;

    RETURN QUERY
        SELECT CASE WHEN ROW_NUMBER() OVER (ORDER BY table_name) < __COUNT THEN
            'SELECT ''' || table_name ||'.'|| column_name || ''' AS tbl, "'  || column_name || '" AS col FROM "public"."' || "table_name" || '" WHERE "'|| "column_name" || '" ILIKE ''%' || _search  || '%'' UNION ALL'
            ELSE
            'SELECT ''' || table_name ||'.'|| column_name || ''' AS tbl, "'  || column_name || '" AS col FROM "public"."' || "table_name" || '" WHERE "'|| "column_name" || '" ILIKE ''%' || _search  || '%'''
        END AS txt

                    FROM     INFORMATION_SCHEMA.COLUMNS
                    WHERE    DATA_TYPE = 'text'
                    AND          table_schema = 'public';
END
$funct$ LANGUAGE plpgsql;`