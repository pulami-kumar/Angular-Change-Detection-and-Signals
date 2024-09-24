using angular_signal_api.Common;
using angular_signal_api.Domain.Enum;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;

public class BaseController : ControllerBase
{
    protected IActionResult ReturnResponse<T>(ApiResponse<T> genericResult) where T : class
    {
        return GenerateResponseByStatus(genericResult);
    }

    protected IActionResult ReturnResponse<T>(
        ResultStatusEnum status,
        string message,
        [Optional] T data,
        [Optional] List<string> errors
    ) where T : class
    {
        var apiResponse = new ApiResponse<T>(status, message, data, errors);
        return GenerateResponseByStatus(apiResponse);
    }

    private IActionResult GenerateResponseByStatus<T>(ApiResponse<T> result) where T : class
    {
        switch (result.Status)
        {
            case ResultStatusEnum.Success:
                return Ok(result);
            case ResultStatusEnum.NoContent:
                return StatusCode(204, result);
            case ResultStatusEnum.Fail:
                return StatusCode(400, result);
            case ResultStatusEnum.Forbidden:
                return StatusCode(403, result);
            case ResultStatusEnum.BadRequest:
                return StatusCode(404, result);
            case ResultStatusEnum.Duplicate:
                return StatusCode(409, result);
            case ResultStatusEnum.UnsupportedMediaType:
                return StatusCode(415, result);
            case ResultStatusEnum.ServerError:
                return StatusCode(500, result);
            default:
                return StatusCode(500, result);
        }
    }
}