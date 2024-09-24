using angular_signal_api.Domain.Enum;
using System.Collections;
using System.Runtime.InteropServices;

namespace angular_signal_api.Common
{
    public class ApiResponse<T> where T : class
    {
        public ResultStatusEnum Status { get; set; }
        public T? Data { get; set; }
        public string Message { get; set; } = string.Empty;
        public List<string> Error { get; set; } = [];

        public ApiResponse(ResultStatusEnum status, string message, [Optional] T data, [Optional] List<string> errors)
        {
            Status = status;
            Message = message;

            ConvertNullListToEmptyList(data);

            if (errors != null)
            {
                Error = errors;
            }
        }

        private void ConvertNullListToEmptyList(T data)
        {
            if (data is not null)
            {
                Data = data;
                return;
            }

            bool isIEnumerable = typeof(IEnumerable).IsAssignableFrom(typeof(T)) && typeof(T) != typeof(string);

            if (isIEnumerable)
            {
                Data = Activator.CreateInstance(typeof(List<>).MakeGenericType(typeof(T))) as T;
            }
            else
            {
                Data = null;
            }
        }
    }
}
