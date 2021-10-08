const db = require('../db');

class BookController {
   async getBook(req, res) {
       const books = await db.query(/*'CREATE OR REPLACE FUNCTION SearchAllTables(_search text) RETURNS TABLE( txt text ) as $funct$\n' +
           '    DECLARE __COUNT int;\n' +
           '    __SQL text;\n' +
           'BEGIN\n' +
           '    EXECUTE \'SELECT COUNT(0) FROM INFORMATION_SCHEMA.COLUMNS\n' +
           '                    WHERE    DATA_TYPE = \'\'text\'\'\n' +
           '                    AND          table_schema = \'\'public\'\' \' INTO __COUNT;\n' +
           '\n' +
           '    RETURN QUERY\n' +
           '        SELECT CASE WHEN ROW_NUMBER() OVER (ORDER BY table_name) < __COUNT THEN\n' +
           '            \'SELECT \'\'\' || table_name ||\'.\'|| column_name || \'\'\' AS tbl, "\'  || column_name || \'" AS col FROM "public"."\' || "table_name" || \'" WHERE "\'|| "column_name" || \'" ILIKE \'\'%\' || _search  || \'%\'\' UNION ALL\'\n' +
           '            ELSE\n' +
           '            \'SELECT \'\'\' || table_name ||\'.\'|| column_name || \'\'\' AS tbl, "\'  || column_name || \'" AS col FROM "public"."\' || "table_name" || \'" WHERE "\'|| "column_name" || \'" ILIKE \'\'%\' || _search  || \'%\'\'\'\n' +
           '        END AS txt\n' +
           '\n' +
           '                    FROM     INFORMATION_SCHEMA.COLUMNS\n' +
           '                    WHERE    DATA_TYPE = \'text\'\n' +
           '                    AND          table_schema = \'public\';\n' +
           'END\n' +
           '$funct$ LANGUAGE plpgsql;'*/);
       res.json(books.rows);
   }
}
