var the = {
    beautify_in_progress: false
};


function any(a, b) {
    return a || b;
}

function unpacker_filter(source) {
    var trailing_comments = '',
        comment = '',
        unpacked = '',
        found = false;

    // cut trailing comments
    do {
        found = false;
        if (/^\s*\/\*/.test(source)) {
            found = true;
            comment = source.substr(0, source.indexOf('*/') + 2);
            source = source.substr(comment.length).replace(/^\s+/, '');
            trailing_comments += comment + "\n";
        } else if (/^\s*\/\//.test(source)) {
            found = true;
            comment = source.match(/^\s*\/\/.*/)[0];
            source = source.substr(comment.length).replace(/^\s+/, '');
            trailing_comments += comment + "\n";
        }
    } while (found);

    var unpackers = [P_A_C_K_E_R, Urlencoded, /*JavascriptObfuscator,*/ MyObfuscate];
    for (var i = 0; i < unpackers.length; i++) {
        if (unpackers[i].detect(source)) {
            unpacked = unpackers[i].unpack(source);
            if (unpacked != source) {
                source = unpacker_filter(unpacked);
            }
        }
    }

    return trailing_comments + source;
}


function beautifyHTML() {
    if (the.beautify_in_progress) return;

    the.beautify_in_progress = true;

    var source = editor.getValue(),
        output,
        opts = {};

    opts.indent_size = 2;
    opts.indent_char = opts.indent_size == 1 ? '\t' : ' ';
    opts.max_preserve_newlines = 0;
    opts.preserve_newlines = opts.max_preserve_newlines !== "-1";
    opts.indent_scripts = "normal";
    opts.brace_style = "collapse";
    opts.space_before_conditional = true;
    opts.unescape_strings = true;
    opts.jslint_happy = false;
    opts.end_with_newline = true;
    opts.wrap_line_length = 0;
    opts.indent_inner_html = true;
    opts.comma_first = true;
    opts.e4x = true;

    if (looks_like_html(source)) {
        output = html_beautify(source, opts);
    }
    // else {
    //     output = js_beautify(source, opts);
    // }
    editor.setValue(output);

    the.beautify_in_progress = false;
}

function looks_like_html(source) {
    // <foo> - looks like html
    // <!--\nalert('foo!');\n--> - doesn't look like html

    var trimmed = source.replace(/^[ \t\n\r]+/, '');
    var comment_mark = '<' + '!-' + '-';
    return (trimmed && (trimmed.substring(0, 1) === '<' && trimmed.substring(0, 4) !== comment_mark));
}