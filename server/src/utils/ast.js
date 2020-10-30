module.exports = function (babel) {
    var t = babel.types;
    // Counter variables for counting the occuerences of each ty of loop
    let forCounter = 1, whileCounter = 1, doCounter = 1;
    return {
        visitor: {
            WhileStatement: function transformWhile(path) {
                _addTimeOut(path, "while_timer", t, whileCounter);
                whileCounter++;
            },
            ForStatement: function transformFor(path) {
                _addTimeOut(path, "for_timer", t, forCounter)
                forCounter++;
            },
            DoWhileStatement: function transformDoWhile(path) {
                _addTimeOut(path, "do_timer", t, doCounter)
                doCounter++;
            }
        }
    };
};

function _addTimeOut(path, varName, t, counter) {
    // Declare and define a variable to track a loop
    // define the variable as current time (before execution of a loop)
    let variableName = path.scope
        .generateUidIdentifier(varName + "" + counter);
    let declaration = t.declareVariable(variableName);
    path.scope.parent.push(declaration);
    let definition = t.assignmentExpression(
        "=",
        variableName,
        t.callExpression(t.memberExpression(t.identifier("Date"), t.identifier("now")), [])
    );
    path.insertBefore(t.expressionStatement(definition));

    // Create an expression to compare current time to variable time + 10 seconds
    // Insert the condition within the body of the loop
    const lhs = t.parenthesizedExpression(t.binaryExpression("+", variableName, t.NumericLiteral(10000))); // 10 seconds time out
    path
        .get("body")
        .pushContainer(
            "body",
            t.ifStatement(
                t.binaryExpression(">", t.callExpression(t.memberExpression(t.identifier("Date"), t.identifier("now")), []), lhs),
                t.throwStatement(t.stringLiteral("Execution Timeout")),
                null
            )
        );
}