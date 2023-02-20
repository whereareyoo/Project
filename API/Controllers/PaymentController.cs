using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class PaymentController : BaseApiController
    {
        private readonly PaymentService _paymentSerivce;
        private readonly StoreContext _context;

        public PaymentController(PaymentService paymentSerivce, StoreContext context)
        {
            _paymentSerivce = paymentSerivce;
            _context = context;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BasketDTO>> CreateOrUpdatePaymentIntent()
        {
            var basket = await _context.Baskets
                .RetrieveBasketWithItems(User.Identity.Name)
                .FirstOrDefaultAsync();

            if (basket == null) return NotFound();

            var intent = await _paymentSerivce.CreateOrUpdatePaymentIntent(basket);

            if (intent == null) return BadRequest(new ProblemDetails{Title="Problem creating paymnent intent"});

            basket.PaymentIntentId = basket.PaymentIntentId ?? intent.Id;
            basket.ClientSecret = basket.ClientSecret ?? intent.ClientSecret;

            _context.Update(basket);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails{Title="Problem updating basket with intent"});

            return basket.MapBasketToDto();
        }
    }
}